import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#5F6FFF]"
              id="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#5F6FFF]"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#5F6FFF]"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          className="mt-2 w-full cursor-pointer rounded-lg bg-[#5F6FFF] py-2.5 font-medium text-sm text-white transition-all hover:opacity-90"
          type="submit"
        >
          {state === "Sign Up" ? "Tạo tài khoản" : "Đăng nhập"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          {state === "Sign Up" ? (
            <>
              Đã có tài khoản?{" "}
              <button
                className="cursor-pointer font-medium text-[#5F6FFF] hover:underline"
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
                className="cursor-pointer font-medium text-[#5F6FFF] hover:underline"
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
