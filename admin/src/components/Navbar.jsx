import { Menu } from "lucide-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.context.js";
import { DoctorContext } from "../context/DoctorContext.context.js";

const Navbar = ({ onToggleMenu }) => {
  const navigate = useNavigate();

  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const role = aToken ? "Admin" : "Doctor";

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
    toast.success("Đã đăng xuất");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-gray-200 border-b bg-white px-4 py-3 md:px-10">
      <div className="flex items-center gap-3">
        <button
          aria-label="Mở menu"
          className="cursor-pointer rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          onClick={onToggleMenu}
          type="button"
        >
          <Menu aria-hidden="true" size={20} />
        </button>
        <img alt="Prescripto" className="h-8 md:h-10" src={assets.admin_logo} />
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[#5F6FFF]/10 px-3 py-1 font-medium text-[#5F6FFF] text-xs">
          {role}
        </span>
        <button
          className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-gray-600 text-sm transition-colors hover:bg-gray-100"
          onClick={logout}
          type="button"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Navbar;
