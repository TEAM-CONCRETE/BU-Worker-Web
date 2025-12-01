import { apiClient } from "@/lib/api/client";
import type {
  DocumentUrlApiResponse,
  PresignedSignatureUrlRequest,
  PresignedSignatureUrlApiResponse,
  SubmitContractSignatureRequest,
  SubmitContractSignatureApiResponse,
} from "@/types/contract";

export const contractApi = {
  // 근로계약서 PDF 조회 (Signed URL 발급)
  getContractDocument: async (
    contractId: number
  ): Promise<DocumentUrlApiResponse> => {
    return apiClient<DocumentUrlApiResponse>(
      `/v1/documents/contracts/${contractId}`,
      {
        method: "GET",
      }
    );
  },

  // 서명 이미지 업로드를 위한 Presigned URL 발급
  getPresignedSignatureUrl: async (
    data: PresignedSignatureUrlRequest
  ): Promise<PresignedSignatureUrlApiResponse> => {
    return apiClient<PresignedSignatureUrlApiResponse>(
      "/v1/uploads/signatures",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  // S3에 서명 이미지 업로드
  uploadSignatureToS3: async (url: string, file: Blob): Promise<void> => {
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error("서명 이미지 업로드에 실패했습니다.");
    }
  },

  // 근로계약서 서명 제출
  submitContractSignature: async (
    siteId: number,
    contractId: number,
    data: SubmitContractSignatureRequest
  ): Promise<SubmitContractSignatureApiResponse> => {
    return apiClient<SubmitContractSignatureApiResponse>(
      `/v1/${siteId}/contracts/${contractId}/signatures/employee`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },
};
