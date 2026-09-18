import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateService } from "../services/api";
import type { CreateServiceData } from "../types";
import { useNavigate } from "react-router-dom";

export function useUpdateService() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateServiceData }) =>
      updateService(id, data),
    onSuccess: () => {
      toast.success("Service Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      navigate("/services");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update service");
    },
  });
}
