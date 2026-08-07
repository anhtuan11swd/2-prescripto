import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppContext from "../context/AppContext";

const slotDateFormat = (slotDate) => {
  const [day, month, year] = slotDate.split("_");
  return `${day} Tháng ${month}, ${year}`;
};

const MyAppointments = () => {
  const { backendUrl, currencySymbol, getDoctorsData, token } =
    useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [payingId, setPayingId] = useState(null);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/user/appointments`,
        { headers: { token } },
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(`${backendUrl}/api/v1/user/appointments`, { headers: { token } })
      .then(({ data }) => {
        if (data.success) {
          setAppointments(data.appointments.reverse());
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => toast.error(error.message));
  }, [backendUrl, token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      setCancelling(true);

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        await getUserAppointments();
        await getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancelling(false);
      setCancelId(null);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      setPayingId(appointmentId);

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/payment-stripe`,
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        window.location.assign(data.session.url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl pt-4 pb-24 sm:pt-10">
      <p className="mb-2 font-bold text-2xl text-gray-900">Lịch hẹn của tôi</p>
      <p className="mb-8 text-gray-500 text-sm">
        Quản lý và theo dõi lịch hẹn của bạn
      </p>

      {appointments.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          Bạn chưa có lịch hẹn nào.
        </p>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          {appointments.map((item) => (
            <div
              className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              key={item._id}
            >
              {/* Left: Doctor */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <img
                  alt={item.docData.name}
                  className="w-40 rounded-lg bg-[#E9EFFF] object-cover sm:w-32"
                  src={item.docData.image}
                />

                {/* Center: Info */}
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <p className="font-medium text-gray-900">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {item.docData.speciality}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {item.docData.address.line1}
                    <br />
                    {item.docData.address.line2}
                  </p>
                  <p className="mt-1 text-gray-700 text-sm">
                    <span className="font-medium">Ngày:</span>{" "}
                    {slotDateFormat(item.slotDate)}
                    <span className="mx-1">·</span>
                    <span className="font-medium">Giờ:</span> {item.slotTime}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Phí:</span>{" "}
                    {item.amount.toLocaleString()} {currencySymbol}
                  </p>
                </div>
              </div>

              {/* Right: Status + Buttons */}
              <div className="flex flex-col items-center gap-2 sm:items-end">
                {item.cancelled && (
                  <p className="rounded-lg bg-red-100 px-4 py-2 font-medium text-red-600 text-sm">
                    Đã hủy
                  </p>
                )}
                {!item.cancelled && (
                  <>
                    {item.payment ? (
                      <p className="rounded-lg bg-green-100 px-4 py-2 font-medium text-green-600 text-sm">
                        Đã thanh toán
                      </p>
                    ) : (
                      <button
                        className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-[#5F6FFF] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={payingId === item._id}
                        onClick={() => appointmentStripe(item._id)}
                        type="button"
                      >
                        {payingId === item._id ? "Đang xử lý..." : "Thanh toán"}
                      </button>
                    )}
                    <button
                      className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-500 text-sm transition-all hover:bg-red-600 hover:text-white"
                      onClick={() => setCancelId(item._id)}
                      type="button"
                    >
                      Hủy lịch
                    </button>
                  </>
                )}
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
                disabled={cancelling}
                onClick={() => setCancelId(null)}
                type="button"
              >
                Đóng
              </button>
              <button
                className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={cancelling}
                onClick={() => cancelAppointment(cancelId)}
                type="button"
              >
                {cancelling ? "Đang hủy..." : "Hủy lịch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
