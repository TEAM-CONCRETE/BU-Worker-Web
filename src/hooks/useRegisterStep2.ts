import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useRegisterStore } from "@/store/registerStore";
import type { RegisterStep2Request } from "@/types/auth";

export function useRegisterStep2() {
  const router = useRouter();
  const profileToken = useRegisterStore((state) => state.profileToken);

  return useMutation({
    mutationFn: (data: Omit<RegisterStep2Request, "registrationToken">) => {
      if (!profileToken) {
        throw new Error("회원가입을 먼저 완료해주세요.");
      }

      return authApi.registerStep2({
        ...data,
        registrationToken: profileToken,
      });
    },
    onSuccess: (response) => {
      if (response.success) {
        router.push("/");
      }
    },
  });
}
