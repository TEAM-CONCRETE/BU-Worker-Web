import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data);

      if (response.success && response.data) {
        if (response.data.role !== "ROLE_EMPLOYEE") {
          throw new Error("근로자 계정만 로그인할 수 있습니다.");
        }

        return response;
      }

      throw new Error(response.message || "로그인에 실패했습니다.");
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data);
        router.push("/home");
      }
    },
  });
}
