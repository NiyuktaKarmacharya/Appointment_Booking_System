import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAppointmentStatus } from "../services/api";
import type { AppointmentStatus } from "../types";
import { useNavigate } from "react-router-dom";

export function useUpdateAppointmentStatus() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: AppointmentStatus }) =>
      updateAppointmentStatus(id, status),
    onSuccess: () => {
      toast.success("Appointment status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      navigate("/appointments");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update appointment status");
    },
  });
}
