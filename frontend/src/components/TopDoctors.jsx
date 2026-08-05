import { useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";

const TopDoctors = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 py-16">
      <p className="font-medium text-2xl text-gray-700">Bác Sĩ Hàng Đầu</p>
      <p className="w-2/3 text-center text-gray-500 text-sm">
        Chỉ cần duyệt qua danh sách bác sĩ đáng tin cậy của chúng tôi, đặt lịch
        hẹn một cách dễ dàng.
      </p>
      <div className="grid w-full grid-cols-2 gap-4 gap-y-6 pt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {doctors.slice(0, 10).map((item) => (
          <button
            className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 text-left transition-all duration-500 hover:-translate-y-2"
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            type="button"
          >
            <img
              alt={item.name}
              className="w-full bg-gray-100"
              src={item.image}
            />
            <div className="flex items-center gap-1 px-2 pt-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-green-500 text-xs">Có lịch trống</p>
            </div>
            <p className="px-2 pt-1 font-medium text-gray-900 text-sm">
              {item.name}
            </p>
            <p className="px-2 pb-3 text-gray-500 text-xs">{item.speciality}</p>
          </button>
        ))}
      </div>
      <button
        className="mt-6 cursor-pointer rounded-full bg-gray-100 px-10 py-3 font-medium text-gray-600 text-sm transition-all hover:bg-gray-200"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        type="button"
      >
        Xem thêm
      </button>
    </div>
  );
};

export default TopDoctors;
