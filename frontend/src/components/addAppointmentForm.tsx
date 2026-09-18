import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import useServices from "../hooks/useServices";
import type { CreateAppointmentData, Service } from "../types";

interface AppointmentFormProps {
  onCancel: () => void;
}

const AddAppointmentForm = ({ onCancel }: AppointmentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAppointmentData>();

  const { data: services, isLoading: servicesLoading } = useServices();

  const { mutate, isPending } = useCreateAppointment();

  const handleSave: SubmitHandler<CreateAppointmentData> = (formdata) => {
    console.log("Appointment data:", formdata);
    mutate(formdata, {
      onSuccess: () => {
        onCancel();
      },
    });
  };

  return (
    <div className="flex flex-col w-[50%] rounded-2xl bg-white p-10 border border-gray-300 my-5 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add Appointment</h1>
      </div>

      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col mt-10 gap-5"
      >
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Customer Name
          </label>

          <input
            type="text"
            id="name"
            placeholder="e.g. John Doe"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("name", {
              required: "Customer name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone
          </label>

          <input
            type="tel"
            id="phone"
            placeholder="e.g. 9841234567"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("phone_number", {
              required: "Phone number is required",
            })}
          />

          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-semibold">
            Service
          </label>

          <select
            id="service"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("service", {
              required: "Service is required",
              valueAsNumber: true,
            })}
          >
            <option value="">
              {servicesLoading ? "Loading services..." : "Select a service"}
            </option>

            {services?.map((service: Service) => (
              <option key={service.id} value={service.id}>
                {service.name} - Rs. {service.price}
              </option>
            ))}
          </select>

          {errors.service && (
            <p className="text-red-500 text-sm mt-1">
              {errors.service.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="text-sm font-semibold">
            Date
          </label>

          <input
            type="date"
            id="date"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("date", {
              required: "Date is required",
            })}
          />

          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="text-sm font-semibold">
            Time
          </label>

          <input
            type="time"
            id="time"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("time", {
              required: "Time is required",
            })}
          />

          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="text-sm font-semibold">
            Notes
          </label>

          <textarea
            id="notes"
            placeholder="Optional notes..."
            rows={4}
            className="border border-gray-200 rounded-md w-full px-4 py-2 mt-2"
            {...register("notes")}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 rounded-md p-3 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Booking..." : "Book Appointment"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-gray-200 rounded-md p-3 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAppointmentForm;
