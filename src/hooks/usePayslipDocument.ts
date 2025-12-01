import { useQuery } from "@tanstack/react-query";
import { salaryApi } from "@/lib/api/salary";

export function usePayslipDocument(payrollId: number) {
  return useQuery({
    queryKey: ["payslip", "document", payrollId],
    queryFn: async () => {
      const response = await salaryApi.getPayslipDocument(payrollId);

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "급여명세서를 불러오는데 실패했습니다."
        );
      }

      return response;
    },
    enabled: !!payrollId,
    retry: 3,
    retryDelay: 1000,
  });
}
