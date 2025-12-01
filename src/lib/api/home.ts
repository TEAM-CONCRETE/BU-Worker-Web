import { apiClient } from "@/lib/api/client";
import type { HomeResponse } from "@/types/home";

export const homeApi = {
  getHomeData: async (): Promise<HomeResponse> => {
    return apiClient<HomeResponse>("/v1/employees/me/home", {
      method: "GET",
    });
  },
};
