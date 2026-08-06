import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { loginUserSchema, registerUserSchema } from "../utils/validate";

const Login = () => {
  const { backendUrl, setToken, token } = useContext(AppContext);

  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const showFieldErrors = (error) =>
    Object.fromEntries(
      (error?.issues ?? []).map((issue) => [issue.path[0], issue.message]),
    );

  const clearFieldError = (field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const schema = state === "Sign Up" ? registerUserSchema : loginUserSchema;
    const result = schema.safeParse({ email, name, password });

    if (!result.success) {
      setErrors(showFieldErrors(result.error));
      toast.error(result.error.issues[0].message);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const endpoint = state === "Sign Up" ? "/register" : "/login";
      const payload = { email, password };

      if (state === "Sign Up") {
        payload.name = result.data.name;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user${endpoint}`,
        payload,
      );

      if (data.success) {
        if (state === "Sign Up") {
          toast.success("Đăng ký thành công, vui lòng đăng nhập");
          setName("");
          setPassword("");
          setState("Login");
        } else {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success("Đăng nhập thành công");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mx-auto min-h-[80vh] w-full max-w-sm pt-20"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4">
        <p className="font-bold text-2xl text-gray-900">
          {state === "Sign Up" ? "Tạo tài khoản" : "Đăng nhập"}
        </p>
        <p className="text-gray-500 text-sm">
          {state === "Sign Up"
            ? "Đăng ký để đặt lịch khám"
            : "Đăng nhập để đặt lịch khám"}
        </p>

        {state === "Sign Up" && (
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm" htmlFor="name">
              Họ tên
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-[#5F6FFF]"
              }`}
              disabled={loading}
              id="name"
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              type="text"
              value={name}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm" htmlFor="email">
            Email
          </label>
          <input
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.email
                ? "border-red-400 focus:border-red-500"
                : "border-gray-300 focus:border-[#5F6FFF]"
            }`}
            disabled={loading}
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            type="email"
            value={email}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm" htmlFor="password">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-[#5F6FFF]"
              }`}
              disabled={loading}
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-400"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
        </div>

        <button
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5F6FFF] py-2.5 font-medium text-sm text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading && (
            <Loader2 aria-hidden="true" className="animate-spin" size={16} />
          )}
          {state === "Sign Up" ? "Tạo tài khoản" : "Đăng nhập"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          {state === "Sign Up" ? (
            <>
              Đã có tài khoản?{" "}
              <button
                className="cursor-pointer font-medium text-[#5F6FFF] hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline"
                disabled={loading}
                onClick={() => setState("Login")}
                type="button"
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <>
              Tạo tài khoản mới?{" "}
              <button
                className="cursor-pointer font-medium text-[#5F6FFF] hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline"
                disabled={loading}
                onClick={() => setState("Sign Up")}
                type="button"
              >
                Đăng ký
              </button>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
