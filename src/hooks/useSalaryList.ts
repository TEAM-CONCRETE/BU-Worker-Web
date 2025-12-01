import { useInfiniteQuery } from "@tanstack/react-query";
import { salaryApi } from "@/lib/api/salary";

const PAGE_SIZE = 20;

export function useSalaryList() {
  return useInfiniteQuery({
    queryKey: ["salary", "list"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await salaryApi.getSalaryList({
        page: pageParam,
        size: PAGE_SIZE,
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "급여 내역을 불러오는데 실패했습니다."
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
