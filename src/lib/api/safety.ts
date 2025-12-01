import { apiClient } from "@/lib/api/client";
import type {
  DocumentUrlApiResponse,
  PresignedSignatureUrlRequest,
  PresignedSignatureUrlApiResponse,
  SubmitSafetyLogSignatureRequest,
  SubmitSafetyLogSignatureApiResponse,
} from "@/types/contract";

export const safetyApi = {
  // 안전교육일지 PDF 조회 (Signed URL 발급)
  getSafetyLogDocument: async (
    logId: number
  ): Promise<DocumentUrlApiResponse> => {
    return apiClient<DocumentUrlApiResponse>(
      `/documents/safety-education-logs/${logId}`,
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
      throw new Error(
        `서명 이미지 업로드에 실패했습니다. (${response.status})`
      );
    }
  },

  // 안전교육일지 서명 제출
  submitSafetyLogSignature: async (
    siteId: number,
    logId: number,
    employeeId: number,
    data: SubmitSafetyLogSignatureRequest
  ): Promise<SubmitSafetyLogSignatureApiResponse> => {
    return apiClient<SubmitSafetyLogSignatureApiResponse>(
      `/v1/${siteId}/safety-education-logs/${logId}/signatures/attendee/${employeeId}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },
};
