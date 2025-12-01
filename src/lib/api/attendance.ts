import { apiClient } from "@/lib/api/client";
import type { AttendanceListResponse } from "@/types/attendance";

export interface GetAttendanceListParams {
  page?: number;
  size?: number;
}

export const attendanceApi = {
  // 본인 출퇴근 내역 조회
  getAttendanceList: async (
    params?: GetAttendanceListParams
  ): Promise<AttendanceListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) {
      searchParams.append("page", params.page.toString());
    }
    if (params?.size !== undefined) {
      searchParams.append("size", params.size.toString());
    }

    const queryString = searchParams.toString();
    const url = `/v1/employees/me/attendance${queryString ? `?${queryString}` : ""}`;

    return apiClient<AttendanceListResponse>(url, {
      method: "GET",
    });
  },
};
