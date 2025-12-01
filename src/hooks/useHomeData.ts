import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/lib/api/home";

export function useHomeData() {
  return useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await homeApi.getHomeData();
      if (!response.success || !response.data) {
        throw new Error(
          response.message || "홈 화면 정보를 불러오는데 실패했습니다."
        );
      }
      return response.data;
    },
  });
}
