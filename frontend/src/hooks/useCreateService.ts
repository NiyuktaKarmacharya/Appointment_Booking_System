import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postService } from "../services/api";
import type { CreateServiceData } from "../types";
import { useNavigate } from "react-router-dom";

export function useCreateService() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: CreateServiceData) => postService(formData),
    onSuccess: () => {
      toast.success("Service Added Sucessfully");
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      navigate("/services");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create service");
    },
  });
}
