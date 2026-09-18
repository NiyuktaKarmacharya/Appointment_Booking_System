export const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10">
        <div className="flex flex-col justify-center max-w-full p-10 gap-5 rounded-2xl text-xl lg:max-w-[100%]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-6xl font-extrabold">Salon Appointments</h2>
              <p className="text-3xl font-bold text-indigo-600">DONE RIGHT</p>
            </div>
            <div>
              <p className="text-md">
                This is my take on a simple salon appointment management system.
                It allows you to manage your salon appointments, services, and
                customers in a simple and intuitive way. You can add, edit, and
                delete appointments and services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
