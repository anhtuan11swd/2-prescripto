import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { DoctorContext } from "../context/DoctorContext.context.js";

const slotDateFormat = (slotDate) => {
  const [day, month, year] = slotDate.split("_");
  return `${day} Tháng ${month}, ${year}`;
};

const DoctorDashboard = () => {
  const { cancelAppointment, dashData, getDashData } =
    useContext(DoctorContext);

  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    getDashData();
  }, [getDashData]);

  if (!dashData) {
    return <div className="text-gray-500 text-sm">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <img alt="" className="w-12" src={assets.earning_icon} />
          <div>
            <p className="font-bold text-2xl text-gray-900">
              {dashData.earnings?.toLocaleString()} ₫
            </p>
            <p className="text-gray-500 text-sm">Thu nhập</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <img alt="" className="w-12" src={assets.appointments_icon} />
          <div>
            <p className="font-bold text-2xl text-gray-900">
              {dashData.appointments}
            </p>
            <p className="text-gray-500 text-sm">Lịch hẹn</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <img alt="" className="w-12" src={assets.patients_icon} />
          <div>
            <p className="font-bold text-2xl text-gray-900">
              {dashData.patients}
            </p>
            <p className="text-gray-500 text-sm">Bệnh nhân</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <img alt="" className="w-5" src={assets.appointment_icon} />
          <p className="font-semibold text-gray-900 text-lg">
            Lịch hẹn gần đây
          </p>
        </div>

        <div className="flex flex-col">
          {dashData.latestAppointments.map((item, index) => (
            <div
              className="flex items-center justify-between gap-4 border-gray-100 border-b px-2 py-3 last:border-b-0"
              key={item._id ?? index}
            >
              <div className="flex items-center gap-3">
                <img
                  alt={item.userData.name}
                  className="h-10 w-10 rounded-full object-cover"
                  src={item.userData.image}
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {slotDateFormat(item.slotDate)} · {item.slotTime}
                  </p>
                </div>
              </div>

              <div>
                {item.cancelled ? (
                  <span className="rounded-lg bg-red-100 px-3 py-1 font-medium text-red-600 text-xs">
                    Đã hủy
                  </span>
                ) : item.isCompleted ? (
                  <span className="rounded-lg bg-green-100 px-3 py-1 font-medium text-green-600 text-xs">
                    Hoàn thành
                  </span>
                ) : (
                  <button
                    aria-label="Hủy lịch hẹn"
                    className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    onClick={() => setCancelId(item._id)}
                    type="button"
                  >
                    <img alt="" className="w-5" src={assets.cancel_icon} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {dashData.latestAppointments.length === 0 && (
            <p className="py-6 text-center text-gray-500 text-sm">
              Chưa có lịch hẹn nào.
            </p>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <p className="font-bold text-gray-900 text-lg">Xác nhận hủy lịch</p>
            <p className="mt-2 text-gray-500 text-sm">
              Bạn có chắc chắn muốn hủy lịch hẹn này không? Hành động này không
              thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-gray-50"
                onClick={() => setCancelId(null)}
                type="button"
              >
                Đóng
              </button>
              <button
                className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white transition-all hover:bg-red-700"
                onClick={async () => {
                  await cancelAppointment(cancelId);
                  setCancelId(null);
                }}
                type="button"
              >
                Hủy lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
