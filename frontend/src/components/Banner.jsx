import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-xl bg-[#5F6FFF] px-6 py-8 md:flex-row md:px-10 lg:px-20">
      {/* Left Side */}
      <div className="flex w-full flex-col gap-4 text-white md:w-1/2">
        <p className="font-semibold text-2xl leading-tight md:text-3xl lg:text-4xl">
          Đặt Lịch Hẹn
          <br />
          Với 100+ Bác Sĩ Đáng Tin Cậy
        </p>
        <button
          className="w-fit cursor-pointer rounded-full bg-white px-8 py-3 font-medium text-[#5F6FFF] text-sm transition-all hover:scale-105"
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          type="button"
        >
          Tạo tài khoản
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2">
        <img
          alt="Đặt lịch hẹn"
          className="w-full md:w-[90%]"
          src={assets.appointment_img}
        />
      </div>
    </div>
  );
};

export default Banner;
