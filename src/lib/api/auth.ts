import { apiClient } from "@/lib/api/client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserIdExistsResponse,
} from "@/types/auth";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
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
};
