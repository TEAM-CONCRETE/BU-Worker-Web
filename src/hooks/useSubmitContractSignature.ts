import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { contractApi } from "@/lib/api/contract";
import { calculateImageHash } from "@/utils/hash";
import type {
  SubmitContractSignatureRequest,
  SignatureCoordinates,
} from "@/types/contract";

interface SubmitContractSignatureParams {
  siteId: number;
  contractId: number;
  signatureBase64: string;
}

export function useSubmitContractSignature() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useMutation({
    mutationFn: async ({
      siteId,
      contractId,
      signatureBase64,
    }: SubmitContractSignatureParams) => {
      // 1. 해시값 계산
      const clientHash = await calculateImageHash(signatureBase64);

      // 2. Base64를 Blob으로 변환
      const base64Data = signatureBase64.includes(",")
        ? signatureBase64.split(",")[1]
        : signatureBase64;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // 3. Presigned URL 발급
      const presignedResponse = await contractApi.getPresignedSignatureUrl({
        resourceType: "CONTRACT",
        resourceId: String(contractId),
        signerRole: "EMPLOYEE",
        fileExtension: "png",
      });

      if (!presignedResponse.success || !presignedResponse.data) {
        throw new Error("Presigned URL 발급에 실패했습니다.");
      }

      const { uploadUrl, s3Key } = presignedResponse.data;

      // 4. S3에 서명 이미지 업로드
      await contractApi.uploadSignatureToS3(uploadUrl, blob);

      // S3 업로드 후 파일이 완전히 저장될 때까지 짧은 대기 시간
      // S3의 일시적 일관성 문제를 방지하기 위함
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 5. 서명 제출 (첫 페이지 오른쪽 아래에 배치)
      // A4 PDF 크기: 595 x 842 포인트
      const coordinates: SignatureCoordinates = {
        x: 480, // 오른쪽에서 약간 왼쪽 (595 - 60 - 여백)
        y: 700, // 아래쪽 (842 - 140 - 여백)
        width: 60,
        height: 20,
        viewWidth: 595,
        viewHeight: 842,
      };

      const submitData: SubmitContractSignatureRequest = {
        signatureS3Key: s3Key,
        clientHash,
        coordinates: {
          x: Math.max(0, Math.min(Number(coordinates.x), 595)),
          y: Math.max(0, Math.min(Number(coordinates.y), 842)),
          width: Math.max(1, Math.min(Number(coordinates.width), 200)),
          height: Math.max(1, Math.min(Number(coordinates.height), 100)),
          viewWidth: Number(coordinates.viewWidth) || 595,
          viewHeight: Number(coordinates.viewHeight) || 842,
        },
      };

      return contractApi.submitContractSignature(
        siteId,
        contractId,
        submitData
      );
    },
    onSuccess: async (_, variables) => {
      // 서명 완료 후 관련 쿼리 캐시 무효화
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["contract-document", variables.contractId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["home"],
        }),
      ]);

      toast.success("근로계약서 서명이 완료되었습니다!");

      // PDF 생성 대기 시간을 두고 페이지 이동
      timeoutRef.current = setTimeout(() => {
        router.push(`/contract/view/${variables.contractId}`);
        timeoutRef.current = null;
      }, 1000);
    },
    onError: (error: Error & { code?: string; status?: number }) => {
      const errorMessage = error.message || "서명 제출에 실패했습니다.";
      toast.error(errorMessage);
    },
  });
}
