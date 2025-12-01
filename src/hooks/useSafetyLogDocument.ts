import { useQuery } from "@tanstack/react-query";
import { safetyApi } from "@/lib/api/safety";

export function useSafetyLogDocument(logId: number) {
  return useQuery({
    queryKey: ["safety-log-document", logId],
    queryFn: () => safetyApi.getSafetyLogDocument(logId),
    enabled: !!logId,
  });
}
