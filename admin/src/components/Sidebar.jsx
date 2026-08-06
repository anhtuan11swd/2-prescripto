import { X } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.context.js";
import { DoctorContext } from "../context/DoctorContext.context.js";

const Sidebar = ({ isOpen, onClose }) => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navItem =
    "flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100";
  const navActive =
    "flex cursor-pointer items-center gap-3 rounded-lg bg-[#5F6FFF]/10 px-4 py-2.5 text-sm font-medium text-[#5F6FFF]";

  return (
    <>
      {isOpen && (
        <button
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 md:hidden"
          onClick={onClose}
          type="button"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-2 border-gray-200 border-r bg-white p-4 transition-transform duration-300 md:static md:z-auto md:translate-x-0 md:border-b ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-2 flex items-center justify-between md:hidden">
          <img alt="Prescripto" className="h-8" src={assets.admin_logo} />
          <button
            aria-label="Đóng menu"
            className="cursor-pointer rounded-lg border border-gray-200 p-1.5 text-gray-500"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          <NavLink
            className={({ isActive }) => (isActive ? navActive : navItem)}
            end
            onClick={onClose}
            to="/"
          >
            <img alt="" className="w-5" src={assets.home_icon} />
            Tổng quan
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? navActive : navItem)}
            onClick={onClose}
            to="/appointments"
          >
            <img alt="" className="w-5" src={assets.appointment_icon} />
            Lịch hẹn
          </NavLink>

          {aToken && (
            <>
              <NavLink
                className={({ isActive }) => (isActive ? navActive : navItem)}
                onClick={onClose}
                to="/add-doctor"
              >
                <img alt="" className="w-5" src={assets.add_icon} />
                Thêm bác sĩ
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? navActive : navItem)}
                onClick={onClose}
                to="/doctor-list"
              >
                <img alt="" className="w-5" src={assets.people_icon} />
                Danh sách bác sĩ
              </NavLink>
            </>
          )}

          {dToken && (
            <NavLink
              className={({ isActive }) => (isActive ? navActive : navItem)}
              onClick={onClose}
              to="/profile"
            >
              <img alt="" className="w-5" src={assets.people_icon} />
              Hồ sơ
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
