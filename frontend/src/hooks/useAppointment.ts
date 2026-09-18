import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/api";

const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
};

export default useAppointments;
