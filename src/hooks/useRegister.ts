import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useRegisterStore } from "@/store/registerStore";
import type { RegisterRequest } from "@/types/auth";

export function useRegister() {
  const router = useRouter();
  const setRegisterData = useRegisterStore((state) => state.setRegisterData);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        // profileToken 저장 (2단계에서 사용)
        setRegisterData(response.data);
        // TODO: 회원가입 2단계 페이지로 리다이렉트
        // router.push("/register/step2");
        // 임시로 로그인 페이지로 리다이렉트
        router.push("/login?registered=true");
      }
    },
  });
}
