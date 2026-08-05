import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import AppContext from "../context/AppContext";

const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const docInfo = useMemo(
    () => doctors.find((doctor) => doctor._id === docId),
    [doctors, docId],
  );

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const docSlots = useMemo(() => {
    if (!docInfo) return [];
    const result = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() + 1);
        if (currentDate.getMinutes() > 30) {
          currentDate.setMinutes(30);
        } else {
          currentDate.setMinutes(0);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const endTime = new Date(currentDate);
      endTime.setHours(21);
      endTime.setMinutes(0);

      const timeSlots = [];

      while (currentDate < endTime) {
        const timeString = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const dateKey = currentDate.toDateString();
        const isBooked = docInfo.slots_booked?.[dateKey]?.includes(timeString);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: timeString,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      result.push(timeSlots);
    }

    return result;
  }, [docInfo]);

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

        {/* Right Side - Info + Booking Slots */}
        <div className="flex w-full flex-col gap-4 sm:w-2/3 sm:pl-8">
          {/* Doctor Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-medium text-2xl text-gray-900">
                {docInfo.name}
              </p>
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
          </div>

          {/* Booking Slots */}
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray-900">Chọn slot đặt lịch</p>

            {/* Day Picker */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {docSlots.map((item, index) => (
                <button
                  className={`flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl py-3 text-sm transition-all ${
                    slotIndex === index
                      ? "bg-[#5F6FFF] text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                  key={item[0]?.datetime?.toISOString() ?? index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  type="button"
                >
                  <p className="font-medium text-xs">
                    {item.length > 0
                      ? daysOfWeek[item[0].datetime.getDay()]
                      : ""}
                  </p>
                  <p className="font-medium text-base">
                    {item.length > 0 ? item[0].datetime.getDate() : ""}
                  </p>
                </button>
              ))}
            </div>

            {/* Time Picker */}
            <div className="flex flex-wrap gap-3">
              {docSlots[slotIndex]?.map((item) => (
                <button
                  className={`cursor-pointer rounded-xl px-4 py-2 text-sm transition-all ${
                    item.time === slotTime
                      ? "bg-[#5F6FFF] text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                  key={item.time}
                  onClick={() => setSlotTime(item.time)}
                  type="button"
                >
                  {item.time}
                </button>
              ))}
            </div>

            {/* Book Button */}
            <button
              className="w-fit cursor-pointer rounded-full bg-[#5F6FFF] px-8 py-3 font-medium text-sm text-white transition-all hover:opacity-90"
              type="button"
            >
              Đặt lịch hẹn
            </button>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
