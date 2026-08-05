import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import AppContext from "../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const docInfo = useMemo(
    () => doctors.find((doctor) => doctor._id === docId),
    [doctors, docId],
  );

  if (!docInfo) return null;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Doctor Detail */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Left Side - Image */}
        <div className="w-full sm:w-1/3">
          <img
            alt={docInfo.name}
            className="w-full rounded-lg bg-[#E9EFFF] object-cover"
            src={docInfo.image}
          />
        </div>

        {/* Right Side - Info */}
        <div className="flex w-full flex-col gap-2 sm:w-2/3 sm:pl-8">
          <div className="flex items-center gap-2">
            <p className="font-medium text-2xl text-gray-900">{docInfo.name}</p>
            <img alt="" className="w-5" src={assets.verified_icon} />
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <p>{docInfo.degree}</p>
            <p className="text-gray-400">·</p>
            <p>{docInfo.speciality}</p>
          </div>

          {/* About */}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">Giới thiệu</p>
              <img alt="" className="w-4" src={assets.info_icon} />
            </div>
            <p className="mt-1 text-gray-600 text-sm leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          {/* Fees */}
          <p className="mt-2 font-medium text-gray-900">
            Phí đặt lịch:{" "}
            <span className="text-gray-700">
              {docInfo.fees.toLocaleString()} {currencySymbol}
            </span>
          </p>

          {/* Book Button */}
          <button
            className="mt-2 w-fit cursor-pointer rounded-full bg-[#5F6FFF] px-8 py-3 font-medium text-sm text-white transition-all hover:opacity-90"
            type="button"
          >
            Đặt lịch hẹn
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
