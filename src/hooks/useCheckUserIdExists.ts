import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";

export function useCheckUserIdExists() {
  return useMutation({
    mutationFn: (userId: string) => authApi.checkUserIdExists(userId),
  });
}
