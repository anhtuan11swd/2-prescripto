import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mx-auto mt-10 max-w-7xl px-4">
      <div className="flex flex-col gap-10 md:flex-row">
        {/* Left Section */}
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <img alt="Prescripto" className="w-36" src={assets.logo} />
          <p className="text-gray-600 text-sm leading-relaxed">
            Prescripto là nền tảng đặt lịch hẹn khám bệnh trực tuyến, giúp bạn
            kết nối với các bác sĩ đáng tin cậy một cách nhanh chóng và dễ dàng.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex w-full flex-col gap-4 md:w-1/4">
          <p className="font-medium text-gray-900">CÔNG TY</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
            <li className="cursor-pointer hover:text-gray-900">Trang chủ</li>
            <li className="cursor-pointer hover:text-gray-900">Giới thiệu</li>
            <li className="cursor-pointer hover:text-gray-900">Liên hệ</li>
            <li className="cursor-pointer hover:text-gray-900">
              Chính sách bảo mật
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex w-full flex-col gap-4 md:w-1/4">
          <p className="font-medium text-gray-900">LIÊN HỆ</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
            <li>0848995246</li>
            <li>anhtuan11.cwt@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <p className="pb-4 text-center text-gray-500 text-sm">
        Copyright © 2026 Trần Anh Tuấn - Bảo lưu mọi quyền.
      </p>
    </div>
  );
};

export default Footer;
