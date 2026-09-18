import { useState } from "react";
import AddAppointmentForm from "../components/addAppointmentForm";
import useAppointments from "../hooks/useAppointment";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";
import type { Appointment, AppointmentStatus } from "../types";
import { useUpdateAppointmentStatus } from "../hooks/useUpdateAppointmentStatus";

export const Appointments = () => {
  const [showForm, setShowForm] = useState(false);
  const { mutate: deleteAppointment, isPending: isDeleting } =
    useDeleteAppointment();
  const { mutate: updateStatus } = useUpdateAppointmentStatus();
  const { data: appointments, isLoading, isError, error } = useAppointments();

  if (isError) {
    return (
      <p className="p-10 text-red-500">
        Failed to load appointments: {error.message}
      </p>
    );
  }

  if (isLoading) {
    return <p className="p-10">Loading appointments...</p>;
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600"
          >
            + Add Appointment
          </button>
        )}
      </div>
      {showForm ? (
        <AddAppointmentForm onCancel={() => setShowForm(false)} />
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment: Appointment) => (
                <tr key={appointment.id} className="border-t border-gray-200">
                  <td className="px-6 py-4">
                    <div className="font-medium">{appointment.name}</div>

                    <div className="text-sm text-gray-500">
                      {appointment.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {appointment.service_details.name}
                  </td>
                  <td className="px-6 py-4">{appointment.date}</td>
                  <td className="px-6 py-4">{appointment.time}</td>
                  <td className="px-6 py-4">{appointment.status}</td>
                  <td className="px-6 py-4">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        updateStatus({
                          id: appointment.id,
                          status: e.target.value as AppointmentStatus,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      className="text-red-600"
                      onClick={() => deleteAppointment(appointment.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments?.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              No appointments found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
