import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data);
        router.push("/home");
      }
    },
  });
}
