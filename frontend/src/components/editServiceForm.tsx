import { useForm, type SubmitHandler } from "react-hook-form";
import { useUpdateService } from "../hooks/useUpdateService";
import type { CreateServiceData, Service } from "../types";

interface EditServiceFormProps {
  service: Service;
  onCancel: () => void;
}

const EditServiceForm = ({ service, onCancel }: EditServiceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceData>({
    defaultValues: {
      name: service.name,
      price: service.price,
      duration: service.duration,
    },
  });

  const { mutate, isPending } = useUpdateService();

  const handleSave: SubmitHandler<CreateServiceData> = (formdata) => {
    mutate(
      {
        id: service.id,
        data: formdata,
      },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  };

  return (
    <div className="flex flex-col w-[50%] rounded-2xl relative bg-white p-10 border border-gray-300 my-5 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Edit Service</h1>
      </div>

      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col mt-10 gap-5"
      >
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Service Name
          </label>

          <input
            type="text"
            id="name"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("name", {
              required: "Service name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="text-sm font-semibold">
            Price
          </label>

          <input
            type="number"
            id="price"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Price must be greater than 0",
              },
            })}
          />

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="duration" className="text-sm font-semibold">
            Duration (minutes)
          </label>

          <input
            type="number"
            id="duration"
            className="border border-gray-200 rounded-md h-10 w-full px-4 mt-2"
            {...register("duration", {
              required: "Duration is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Duration must be greater than 0",
              },
            })}
          />

          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 rounded-md p-3 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Service"}
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

export default EditServiceForm;
