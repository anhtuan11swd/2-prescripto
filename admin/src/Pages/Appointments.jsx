import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.context.js";

const slotDateFormat = (slotDate) => {
  const [day, month, year] = slotDate.split("_");
  return `${day} Tháng ${month}, ${year}`;
};

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

const Appointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);

  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="flex flex-col gap-6">
      <p className="font-semibold text-gray-900 text-lg">Tất cả lịch hẹn</p>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        {/* Header - Desktop */}
        <div className="hidden border-gray-200 border-b bg-gray-50 px-6 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider md:grid md:grid-cols-[0.5fr_2fr_1fr_1.5fr_1.5fr_1fr_0.5fr]">
          <span>#</span>
          <span>Bệnh nhân</span>
          <span>Tuổi</span>
          <span>Ngày & Giờ</span>
          <span>Bác sĩ</span>
          <span>Phí</span>
          <span className="text-right">Hành động</span>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            className="flex flex-col gap-3 border-gray-100 border-b px-6 py-4 text-sm last:border-b-0 md:grid md:grid-cols-[0.5fr_2fr_1fr_1.5fr_1.5fr_1fr_0.5fr] md:items-center md:gap-0"
            key={item._id}
          >
            {/* Mobile: grouped layout */}
            <div className="flex flex-col gap-3 md:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt={item.userData.name}
                    className="h-10 w-10 rounded-full object-cover"
                    src={item.userData.image}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {calculateAge(item.userData.dob)} tuổi
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs">#{index + 1}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Ngày & Giờ</p>
                  <p className="text-gray-700">
                    {slotDateFormat(item.slotDate)}
                  </p>
                  <p className="text-gray-500 text-xs">{item.slotTime}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Bác sĩ</p>
                  <p className="text-gray-700">{item.docData.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Phí</p>
                  <p className="font-medium text-gray-900">
                    {item.amount.toLocaleString()} ₫
                  </p>
                </div>
                <div className="flex items-end justify-end">
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
            </div>

            {/* Desktop: grid layout */}
            <span className="hidden text-gray-500 md:block">{index + 1}</span>
            <div className="hidden items-center gap-3 md:flex">
              <img
                alt={item.userData.name}
                className="h-9 w-9 rounded-full object-cover"
                src={item.userData.image}
              />
              <p className="font-medium text-gray-900">{item.userData.name}</p>
            </div>
            <span className="hidden text-gray-600 md:block">
              {calculateAge(item.userData.dob)}
            </span>
            <div className="hidden md:block">
              <p className="text-gray-700">{slotDateFormat(item.slotDate)}</p>
              <p className="text-gray-500 text-xs">{item.slotTime}</p>
            </div>
            <span className="hidden text-gray-700 md:block">
              {item.docData.name}
            </span>
            <span className="hidden font-medium text-gray-900 md:block">
              {item.amount.toLocaleString()} ₫
            </span>
            <div className="hidden justify-end md:block">
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

        {appointments.length === 0 && (
          <p className="py-10 text-center text-gray-500 text-sm">
            Chưa có lịch hẹn nào.
          </p>
        )}
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

export default Appointments;
