import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.context.js";

const DoctorsList = () => {
  const { aToken, changeAvailability, doctors, getAllDoctors } =
    useContext(AdminContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <img alt="" className="w-5" src={assets.people_icon} />
        <p className="font-semibold text-gray-900 text-lg">Danh sách bác sĩ</p>
      </div>

      {loading ? (
        <div className="text-gray-500 text-sm">Đang tải...</div>
      ) : doctors.length === 0 ? (
        <div className="text-gray-500 text-sm">Chưa có bác sĩ nào</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((item) => (
            <div
              className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
              key={item._id}
            >
              <div className="relative flex items-center justify-center bg-[#5F6FFF]/10 p-4">
                <img
                  alt={item.name}
                  className="h-32 w-32 rounded-full object-cover"
                  src={item.image}
                />
              </div>

              <div className="flex flex-col gap-1 p-4">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.speciality}</p>

                <label className="mt-2 flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-gray-700 text-sm">
                  {item.available ? "Đang nhận khám" : "Tạm nghỉ"}
                  <input
                    checked={item.available}
                    className="cursor-pointer accent-[#5F6FFF]"
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
