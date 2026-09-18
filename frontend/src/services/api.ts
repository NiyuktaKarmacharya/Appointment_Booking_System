import axios from "axios";
import type {
  AppointmentStatus,
  CreateAppointmentData,
  CreateServiceData,
} from "../types";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getServices = async () => {
  const response = await api.get("/services/");
  return response.data;
};

export const postService = async (service: CreateServiceData) => {
  const response = await api.post("/services/", service);
  return response.data;
};

export const updateService = async (id: number, service: CreateServiceData) => {
  const response = await api.put(`/services/${id}/`, service);
  return response.data;
};

export const getAppointments = async () => {
  const response = await api.get(`/appointments/`);
  return response.data;
};

export const createAppointment = async (appointment: CreateAppointmentData) => {
  const response = await api.post("/appointments/", appointment);
  return response.data;
};

export const updateAppointmentStatus = async (
  id: number,
  status: AppointmentStatus,
) => {
  const response = await api.patch(`/appointments/${id}/status/`, { status });
  return response.data;
};

export const deleteAppointment = async (id: number) => {
  const response = await api.delete(`/appointments/delete/${id}/`);
  return response.data;
};

export const deleteService = async (id: number) => {
  const response = await api.delete(`/services/${id}/`);
  return response.data;
};
