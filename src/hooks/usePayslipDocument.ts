import { useQuery } from "@tanstack/react-query";
import { salaryApi } from "@/lib/api/salary";
import { useAuthStore } from "@/store/authStore";

export function usePayslipDocument() {
  const user = useAuthStore((state) => state.user);
  const employeeId = user?.employeeId;

  return useQuery({
    queryKey: ["payslip", "document", employeeId],
    queryFn: async () => {
      if (!employeeId) {
        throw new Error("employeeId를 찾을 수 없습니다.");
      }
      const response = await salaryApi.getPayslipDocument(employeeId);

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "급여명세서를 불러오는데 실패했습니다."
        );
      }

      return response;
    },
    enabled: !!employeeId,
    retry: 3,
    retryDelay: 1000,
  });
}
