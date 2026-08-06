import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.context.js";
import { DoctorContext } from "../context/DoctorContext.context.js";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("admin@prescripto.com");
  const [password, setPassword] = useState("admin123");

  const { backendUrl, setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/v1/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          setAToken(data.token);
          localStorage.setItem("aToken", data.token);
          toast.success("Đăng nhập admin thành công");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/v1/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          setDToken(data.token);
          localStorage.setItem("dToken", data.token);
          toast.success("Đăng nhập bác sĩ thành công");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50";
  const disabled = loading;

  return (
    <form
      className="mx-auto flex min-h-screen w-full max-w-sm flex-col items-center justify-center gap-8"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col items-center gap-2">
        <img alt="Prescripto Panel" className="w-44" src={assets.admin_logo} />
        <p className="font-medium text-gray-500 text-sm">
          {state === "Admin" ? "Đăng nhập Admin" : "Đăng nhập Doctor"}
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm" htmlFor="email">
            Email
          </label>
          <input
            className={inputClass}
            disabled={disabled}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm" htmlFor="password">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              className={`${inputClass} pr-10`}
              disabled={disabled}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
              onClick={() => setShowPassword((show) => !show)}
              type="button"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" size={18} />
              ) : (
                <Eye aria-hidden="true" size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5F6FFF] py-2.5 font-medium text-sm text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
          disabled={disabled}
          type="submit"
        >
          {loading && (
            <Loader2 aria-hidden="true" className="animate-spin" size={16} />
          )}
          Đăng nhập
        </button>

        <p className="text-center text-gray-500 text-sm">
          {state === "Admin" ? (
            <>
              Đăng nhập với vai trò bác sĩ?{" "}
              <button
                className="cursor-pointer font-medium text-[#5F6FFF] transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                disabled={disabled}
                onClick={() => {
                  setState("Doctor");
                  setEmail("");
                  setPassword("");
                }}
                type="button"
              >
                Đăng nhập bác sĩ
              </button>
            </>
          ) : (
            <>
              Đăng nhập với vai trò quản trị?{" "}
              <button
                className="cursor-pointer font-medium text-[#5F6FFF] transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                disabled={disabled}
                onClick={() => {
                  setState("Admin");
                  setEmail("admin@prescripto.com");
                  setPassword("admin123");
                }}
                type="button"
              >
                Đăng nhập quản trị
              </button>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
