import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateService } from "../hooks/useCreateService";
import type { CreateServiceData } from "../types";

interface AddServiceFormProps {
  onCancel: () => void;
}

const AddServiceForm = ({ onCancel }: AddServiceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceData>();
  const { mutate } = useCreateService();
  const handleSave: SubmitHandler<CreateServiceData> = (formdata) => {
    mutate(formdata, {
      onSuccess: () => {
        onCancel();
      },
    });
  };

  return (
    <div className="flex flex-col w-[50%] rounded-2xl relative bg-white p-10 border border-gray-300 my-5 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add Service</h1>
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
            placeholder="e.g. Haircut"
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
            placeholder="e.g. 500"
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
            placeholder="e.g. 60"
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
          className="w-full bg-blue-500 rounded-md p-3 text-white hover:bg-blue-600"
        >
          Save Service
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

export default AddServiceForm;
