import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../context/DoctorContext.context.js";

const DoctorProfile = () => {
  const { getProfileData, profileData, updateProfile } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const handleSave = async () => {
    setLoading(true);
    await updateProfile(fees, { line1: address1, line2: address2 }, available);
    setLoading(false);
    setIsEdit(false);
  };

  if (!profileData) {
    return <div className="text-gray-500 text-sm">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="font-semibold text-gray-900 text-lg">Hồ sơ bác sĩ</p>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <img
            alt={profileData.name}
            className="h-44 w-44 rounded-full object-cover"
            src={profileData.image}
          />
          <p className="font-semibold text-gray-900 text-lg">
            {profileData.name}
          </p>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-email">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                disabled
                id="doc-email"
                value={profileData.email}
              />
            </div>

            {/* Speciality */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-speciality">
                Chuyên khoa
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                disabled
                id="doc-speciality"
                value={profileData.speciality}
              />
            </div>

            {/* Degree */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-degree">
                Bằng cấp
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                disabled
                id="doc-degree"
                value={profileData.degree}
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-experience">
                Kinh nghiệm
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                disabled
                id="doc-experience"
                value={profileData.experience}
              />
            </div>

            {/* Fees */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-fees">
                Phí khám (₫)
              </label>
              {isEdit ? (
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#5F6FFF]"
                  id="doc-fees"
                  onChange={(e) => setFees(e.target.value)}
                  type="number"
                  value={fees}
                />
              ) : (
                <input
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                  disabled
                  id="doc-fees"
                  value={`${profileData.fees?.toLocaleString()} ₫`}
                />
              )}
            </div>

            {/* Address Line 1 */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-addr1">
                Địa chỉ 1
              </label>
              {isEdit ? (
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#5F6FFF]"
                  id="doc-addr1"
                  onChange={(e) => setAddress1(e.target.value)}
                  type="text"
                  value={address1}
                />
              ) : (
                <input
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                  disabled
                  id="doc-addr1"
                  value={profileData.address?.line1}
                />
              )}
            </div>

            {/* Address Line 2 */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-addr2">
                Địa chỉ 2
              </label>
              {isEdit ? (
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#5F6FFF]"
                  id="doc-addr2"
                  onChange={(e) => setAddress2(e.target.value)}
                  type="text"
                  value={address2}
                />
              ) : (
                <input
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
                  disabled
                  id="doc-addr2"
                  value={profileData.address?.line2}
                />
              )}
            </div>

            {/* Available */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm" htmlFor="doc-available">
                Trạng thái làm việc
              </label>
              {isEdit ? (
                <label
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  htmlFor="doc-available"
                >
                  <input
                    checked={available}
                    className="cursor-pointer accent-[#5F6FFF]"
                    id="doc-available"
                    onChange={(e) => setAvailable(e.target.checked)}
                    type="checkbox"
                  />
                  {available ? "Đang nhận khám" : "Tạm nghỉ"}
                </label>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm">
                  <div
                    className={`h-2 w-2 rounded-full ${profileData.available ? "bg-green-500" : "bg-gray-400"}`}
                  />
                  <span className="text-gray-700">
                    {profileData.available ? "Đang nhận khám" : "Tạm nghỉ"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm" htmlFor="doc-about">
              Giới thiệu
            </label>
            <textarea
              className="min-h-24 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 text-sm"
              disabled
              id="doc-about"
              value={profileData.about}
            />
          </div>

          {/* Actions */}
          <div>
            {isEdit ? (
              <div className="flex gap-3">
                <button
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5F6FFF] px-6 py-2.5 font-medium text-sm text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                  onClick={handleSave}
                  type="button"
                >
                  {loading && (
                    <Loader2
                      aria-hidden="true"
                      className="animate-spin"
                      size={16}
                    />
                  )}
                  Lưu
                </button>
                <button
                  className="cursor-pointer rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 text-sm transition-all hover:bg-gray-50"
                  onClick={() => {
                    setIsEdit(false);
                    setFees(profileData.fees || "");
                    setAddress1(profileData.address?.line1 || "");
                    setAddress2(profileData.address?.line2 || "");
                    setAvailable(profileData.available || false);
                  }}
                  type="button"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                className="cursor-pointer rounded-lg bg-[#5F6FFF] px-6 py-2.5 font-medium text-sm text-white transition-all hover:opacity-90"
                onClick={() => {
                  setFees(profileData.fees || "");
                  setAddress1(profileData.address?.line1 || "");
                  setAddress2(profileData.address?.line2 || "");
                  setAvailable(profileData.available || false);
                  setIsEdit(true);
                }}
                type="button"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
