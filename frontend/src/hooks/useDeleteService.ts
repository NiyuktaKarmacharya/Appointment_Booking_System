import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "../services/api";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
};
