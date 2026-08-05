import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-xl bg-[#5F6FFF] px-6 py-6 md:flex-row md:px-10 lg:px-20">
      {/* Left Side */}
      <div className="flex w-full flex-col gap-4 text-white md:w-1/2">
        <p className="font-semibold text-3xl leading-tight md:text-4xl lg:text-5xl">
          Đặt Lịch Hẹn Với Các Bác Sĩ Đáng Tin Cậy
        </p>
        <div className="flex items-center gap-3">
          <img
            alt="Group profiles"
            className="w-12"
            src={assets.group_profiles}
          />
          <p className="text-sm leading-snug">
            Chỉ cần duyệt qua danh sách bác sĩ đáng tin cậy của chúng tôi,
            <br className="hidden sm:block" />
            đặt lịch hẹn một cách dễ dàng.
          </p>
        </div>
        <a
          className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#5F6FFF] text-sm transition-all hover:scale-105"
          href="#speciality"
        >
          Đặt lịch hẹn
          <img alt="" className="w-3" src={assets.arrow_icon} />
        </a>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2">
        <img
          alt="Bác sĩ đáng tin cậy"
          className="w-full"
          src={assets.header_img}
        />
      </div>
    </div>
  );
};

export default Header;
