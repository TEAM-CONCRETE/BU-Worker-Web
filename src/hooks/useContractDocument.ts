import { useQuery } from "@tanstack/react-query";
import { contractApi } from "@/lib/api/contract";

export function useContractDocument(contractId: number) {
  return useQuery({
    queryKey: ["contract-document", contractId],
    queryFn: () => contractApi.getContractDocument(contractId),
    enabled: !!contractId,
  });
}
