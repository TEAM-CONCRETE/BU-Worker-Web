import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useRegisterStore } from "@/store/registerStore";
import type { PresignedUrlRequest } from "@/types/auth";

export function useRegisterFace() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const registerData = useRegisterStore((state) => state.registerData);

  return useMutation({
    mutationFn: async (faceImageBlob: Blob) => {
      // employeeId: 로그인한 사용자의 employeeId 우선, 없으면 회원가입 데이터에서
      const employeeId = user?.employeeId || registerData?.profile?.employeeId;

      if (!employeeId) {
        throw new Error("employeeId를 찾을 수 없습니다.");
      }

      // 1. Presigned URL 발급
      const presignedUrlData: PresignedUrlRequest = {
        resourceType: "EMPLOYEE_PROFILE",
        fileExtension: "jpg",
        employeeId: employeeId,
      };

      const presignedResponse = await authApi.getPresignedUrl(presignedUrlData);

      if (!presignedResponse.success || !presignedResponse.data) {
        throw new Error("Presigned URL 발급에 실패했습니다.");
      }

      const { uploadUrl, s3Key } = presignedResponse.data;

      // 2. S3에 이미지 업로드
      await authApi.uploadToS3(uploadUrl, faceImageBlob);

      // 3. 얼굴 등록 API 호출
      const registerResponse = await authApi.registerFace({
        uploadId: s3Key,
      });

      return registerResponse;
    },
    onSuccess: (response) => {
      if (response.success) {
        // 얼굴 등록 완료 후 home으로 이동
        router.push("/home?registered=true");
      }
    },
  });
}
