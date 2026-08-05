import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <div
      className="mx-auto flex max-w-7xl flex-col items-center gap-4 py-16"
      id="speciality"
    >
      <p className="font-medium text-2xl text-gray-700">Tìm theo chuyên khoa</p>
      <p className="w-2/3 text-center text-gray-500 text-sm">
        Chỉ cần duyệt qua danh sách bác sĩ đáng tin cậy của chúng tôi, đặt lịch
        hẹn một cách dễ dàng.
      </p>
      <div className="flex w-full gap-4 overflow-x-auto pt-4 sm:justify-center">
        {specialityData.map((item) => (
          <Link
            className="flex shrink-0 flex-col items-center gap-2 text-gray-600 text-xs transition-all hover:-translate-y-2"
            key={item.speciality}
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
          >
            <img
              alt={item.speciality}
              className="w-16 sm:w-24"
              src={item.image}
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
