import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";

const specialityData = [
  "Bác sĩ đa khoa",
  "Bác sĩ phụ khoa",
  "Bác sĩ da liễu",
  "Bác sĩ nhi khoa",
  "Bác sĩ thần kinh",
  "Bác sĩ tiêu hóa",
];

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const filterDoc = useMemo(() => {
    if (speciality) {
      return doctors.filter((doc) => doc.speciality === speciality);
    }
    return doctors;
  }, [doctors, speciality]);

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-gray-600 text-sm">
        Duyệt qua các bác sĩ theo chuyên khoa
      </p>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Filter Button (Mobile) */}
        <button
          className="flex w-fit items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-gray-600 text-sm md:hidden"
          onClick={() => setShowFilter(!showFilter)}
          type="button"
        >
          <p>Bộ lọc</p>
          <img
            alt=""
            className={`h-3 w-3 ${showFilter ? "rotate-180" : ""}`}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236B7280'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"
          />
        </button>

        {/* Filter Menu */}
        <div
          className={`flex w-full flex-col gap-3 sm:w-48 ${showFilter ? "flex" : "hidden"} md:flex`}
        >
          {specialityData.map((item) => (
            <button
              className={`w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm transition-all ${
                speciality === item
                  ? "bg-indigo-50 font-medium text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              key={item}
              onClick={() => {
                if (speciality === item) {
                  navigate("/doctors");
                } else {
                  navigate(`/doctors/${item}`);
                }
                scrollTo(0, 0);
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid w-full grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {filterDoc.map((item) => (
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
              <p className="px-2 pb-3 text-gray-500 text-xs">
                {item.speciality}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
