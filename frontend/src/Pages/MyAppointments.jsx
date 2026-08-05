import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const MyAppointments = () => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const [appointments, setAppointments] = useState(
    doctors.slice(0, 3).map((doc) => ({
      ...doc,
      slotDate: "05/08/2026",
      slotTime: "10:00 AM",
    })),
  );
  const [cancelId, setCancelId] = useState(null);

  const handleCancel = () => {
    setAppointments((prev) => prev.filter((item) => item._id !== cancelId));
    setCancelId(null);
  };

  return (
    <div className="mx-auto max-w-7xl pt-10 pb-24">
      <p className="mb-2 font-bold text-2xl text-gray-900">Lịch hẹn của tôi</p>
      <p className="mb-8 text-gray-500 text-sm">
        Quản lý và theo dõi lịch hẹn của bạn
      </p>

      {appointments.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          Bạn chưa có lịch hẹn nào.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {appointments.map((item) => (
            <div
              className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              key={item._id}
            >
              {/* Left: Image */}
              <div className="flex items-center gap-4">
                <img
                  alt={item.name}
                  className="w-24 rounded-lg bg-[#E9EFFF] object-cover sm:w-32"
                  src={item.image}
                />

                {/* Center: Info */}
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                  <p className="text-gray-500 text-sm">
                    {item.address.line1}
                    <br />
                    {item.address.line2}
                  </p>
                  <p className="mt-1 text-gray-700 text-sm">
                    <span className="font-medium">Ngày:</span> {item.slotDate}
                    <span className="mx-1">·</span>
                    <span className="font-medium">Giờ:</span> {item.slotTime}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Phí:</span>{" "}
                    {item.fees.toLocaleString()} {currencySymbol}
                  </p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex gap-2 sm:flex-col">
                <button
                  className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-[#5F6FFF] hover:text-white"
                  type="button"
                >
                  Thanh toán
                </button>
                <button
                  className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-500 text-sm transition-all hover:bg-red-600 hover:text-white"
                  onClick={() => setCancelId(item._id)}
                  type="button"
                >
                  Hủy lịch
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                onClick={handleCancel}
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

export default MyAppointments;
