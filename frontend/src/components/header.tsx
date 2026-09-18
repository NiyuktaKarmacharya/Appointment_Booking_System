import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-10 py-5">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold font-serif">
          Salon Appointment Management
        </NavLink>

        <nav className="hidden md:flex items-center gap-5 font-medium">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-gray-600 hover:text-blue-700"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-gray-600 hover:text-blue-700"
            }
          >
            Appointments
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
