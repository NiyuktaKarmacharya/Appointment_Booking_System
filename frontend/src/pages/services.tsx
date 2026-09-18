import { useState } from "react";
import AddServiceForm from "../components/addServiceForm";
import EditServiceForm from "../components/editServiceForm";
import useServices from "../hooks/useServices";
import type { Service } from "../types";
import { useDeleteService } from "../hooks/useDeleteService";
const Services = () => {
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { data: services, isLoading, isError, error } = useServices();
  if (isError) {
    return (
      <p className="p-10 text-red-500">
        Failed to load services: {error.message}
      </p>
    );
  }
  if (isLoading) {
    return <p className="p-10">Loading services...</p>;
  }
  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
  };
  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        {!showForm && (
          <button
            type="button"
            onClick={() => {
              setEditingService(null);
              setShowForm(true);
            }}
            className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600"
          >
            + Add Service
          </button>
        )}
      </div>
      {showForm ? (
        editingService ? (
          <EditServiceForm service={editingService} onCancel={handleCancel} />
        ) : (
          <AddServiceForm onCancel={handleCancel} />
        )
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services?.map((service: Service) => (
                <tr key={service.id} className="border-t border-gray-200">
                  <td className="px-6 py-4"> {service.id} </td>
                  <td className="px-6 py-4 font-medium"> {service.name} </td>
                  <td className="px-6 py-4"> Rs. {service.price} </td>
                  <td className="px-6 py-4"> {service.duration} minutes </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 mr-4 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteService(service.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {services?.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              No services found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default Services;
