export type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
};

export type CreateServiceData = {
  name: string;
  price: number;
  duration: number;
};
export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type Appointment = {
  id: number;
  name: string;
  phone: string;
  service: number;
  service_details: Service;
  date: string;
  time: string;
  notes?: string;
  status: AppointmentStatus;
};

export type CreateAppointmentData = {
  name: string;
  phone_number: string;
  service: number;
  date: string;
  time: string;
  notes?: string;
};
