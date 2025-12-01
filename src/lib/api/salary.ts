import { apiClient } from "@/lib/api/client";
import type { SalaryListResponse } from "@/types/salary";
import type { DocumentUrlApiResponse } from "@/types/contract";

export interface GetSalaryListParams {
  page?: number;
  size?: number;
}

export const salaryApi = {
  // 본인 급여 내역 조회
  getSalaryList: async (
    params?: GetSalaryListParams
  ): Promise<SalaryListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) {
      searchParams.append("page", params.page.toString());
    }
    if (params?.size !== undefined) {
      searchParams.append("size", params.size.toString());
    }

    const queryString = searchParams.toString();
    const url = `/v1/employees/me/payroll${queryString ? `?${queryString}` : ""}`;

    return apiClient<SalaryListResponse>(url, {
      method: "GET",
    });
  },

  // 급여명세서 PDF 조회 (Signed URL 발급)
  getPayslipDocument: async (
    payrollId: number
  ): Promise<DocumentUrlApiResponse> => {
    return apiClient<DocumentUrlApiResponse>(
      `/documents/payroll/${payrollId}`,
      {
        method: "GET",
      }
    );
  },
};
