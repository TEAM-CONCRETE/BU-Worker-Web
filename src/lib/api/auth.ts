import { apiClient } from "@/lib/api/client";
import type {
  LoginRequest,
  LoginResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
  RegisterFaceRequest,
  RegisterFaceResponse,
  RegisterRequest,
  RegisterResponse,
  RegisterStep2Request,
  RegisterStep2Response,
  UserIdExistsResponse,
} from "@/types/auth";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  refreshToken: async (): Promise<LoginResponse> => {
    return apiClient<LoginResponse>("/v1/auth/token/refresh", {
      method: "POST",
    });
  },
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiClient<RegisterResponse>("/v1/auth/register/employee/step1", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  checkUserIdExists: async (userId: string): Promise<UserIdExistsResponse> => {
    return apiClient<UserIdExistsResponse>(
      `/v1/auth/exists?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
      }
    );
  },
  registerStep2: async (
    data: RegisterStep2Request
  ): Promise<RegisterStep2Response> => {
    return apiClient<RegisterStep2Response>(
      "/v1/auth/register/employee/step2",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },
  // Presigned URL 발급
  getPresignedUrl: async (
    data: PresignedUrlRequest
  ): Promise<PresignedUrlResponse> => {
    return apiClient<PresignedUrlResponse>("/v1/uploads/presign", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  // S3에 파일 업로드
  uploadToS3: async (url: string, file: Blob): Promise<void> => {
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error("S3 업로드에 실패했습니다.");
    }
  },
  // 얼굴 등록
  registerFace: async (
    data: RegisterFaceRequest
  ): Promise<RegisterFaceResponse> => {
    return apiClient<RegisterFaceResponse>("/v1/attendance/my-face", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
