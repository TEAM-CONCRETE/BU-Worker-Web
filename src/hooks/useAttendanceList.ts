import { useInfiniteQuery } from "@tanstack/react-query";
import { attendanceApi } from "@/lib/api/attendance";

const PAGE_SIZE = 20;

export function useAttendanceList() {
  return useInfiniteQuery({
    queryKey: ["attendance", "list"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await attendanceApi.getAttendanceList({
        page: pageParam,
        size: PAGE_SIZE,
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "출퇴근 내역을 불러오는데 실패했습니다."
        );
      }

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
  });
}
