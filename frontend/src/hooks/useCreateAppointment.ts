import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../services/api";
import type { CreateAppointmentData } from "../types";
import { toast } from "sonner";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentData) => createAppointment(data),

    onSuccess: () => {
      toast.success("Appointment Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
