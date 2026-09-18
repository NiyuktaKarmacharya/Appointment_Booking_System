import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/api";

function useServices() {
  const query = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return { ...query, data: query.data ?? null };
}

export default useServices;
