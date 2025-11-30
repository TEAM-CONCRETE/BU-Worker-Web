import { apiClient } from "@/lib/api/client";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
