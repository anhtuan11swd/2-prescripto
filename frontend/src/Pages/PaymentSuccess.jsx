import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppContext from "../context/AppContext";

const PaymentSuccess = () => {
  const { backendUrl, getDoctorsData, token } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  const hasSession = Boolean(sessionId && token);
  const [status, setStatus] = useState(hasSession ? "loading" : "failed");

  useEffect(() => {
    if (!hasSession) {
      return;
    }

    const verify = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/v1/user/verify-stripe`,
          { sessionId },
          { headers: { token } },
        );

        if (data.success) {
          await getDoctorsData();
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [backendUrl, getDoctorsData, hasSession, sessionId, token]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      {status === "loading" && (
        <>
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
          <p className="text-gray-600">Đang xác minh thanh toán...</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              aria-label="Success"
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-medium text-gray-900 text-xl">
            Thanh toán thành công!
          </p>
          <p className="text-gray-500 text-sm">
            Lịch hẹn của bạn đã được xác nhận.
          </p>
          <button
            className="mt-4 cursor-pointer rounded-full bg-[#5F6FFF] px-8 py-3 font-medium text-sm text-white transition-all hover:opacity-90"
            onClick={() => {
              navigate("/my-appointments");
              scrollTo(0, 0);
            }}
            type="button"
          >
            Xem lịch hẹn của tôi
          </button>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              aria-label="Failed"
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-medium text-gray-900 text-xl">
            Thanh toán thất bại
          </p>
          <p className="text-gray-500 text-sm">
            Đã xảy ra lỗi khi xác minh thanh toán. Vui lòng thử lại.
          </p>
          <button
            className="mt-4 cursor-pointer rounded-full bg-[#5F6FFF] px-8 py-3 font-medium text-sm text-white transition-all hover:opacity-90"
            onClick={() => {
              navigate("/my-appointments");
              scrollTo(0, 0);
            }}
            type="button"
          >
            Quay lại lịch hẹn
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
