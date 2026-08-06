import axios from "axios";
import { Camera } from "lucide-react";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import AppContext from "../context/AppContext";
import { profileEditSchema } from "../utils/validate";

const formatDisplayDate = (value) => {
  if (!value || value === "Not Selected") return value;
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
};

const MyProfile = () => {
  const { backendUrl, loadUserProfileData, token, userData } =
    useContext(AppContext);

  const fileInputRef = useRef(null);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    address: { line1: "", line2: "" },
    dob: "",
    gender: "Nam",
    name: "",
    phone: "",
  });

  const startEdit = () => {
    setFormData({
      address: { ...userData.address },
      dob: userData.dob,
      gender: userData.gender,
      name: userData.name,
      phone: userData.phone,
    });
    setErrors({});
    setImage(false);
    setIsEdit(true);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setErrors({});
    setImage(false);
  };

  const updateUserProfileData = async () => {
    const result = profileEditSchema.safeParse({
      name: formData.name,
      phone: formData.phone,
    });

    if (!result.success) {
      setErrors(
        Object.fromEntries(
          (result.error.issues ?? []).map((issue) => [
            issue.path[0],
            issue.message,
          ]),
        ),
      );
      toast.error(result.error.issues[0].message);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("gender", formData.gender);
      form.append("dob", formData.dob);
      form.append("address", JSON.stringify(formData.address));

      if (image) {
        form.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/update-profile`,
        form,
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setImage(false);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="mx-auto flex max-w-2xl items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5F6FFF] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            alt={userData.name}
            className="h-28 w-28 rounded-full object-cover"
            src={image ? URL.createObjectURL(image) : userData.image}
          />
          {isEdit && (
            <>
              <button
                aria-label="Chọn ảnh đại diện"
                className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#5F6FFF] text-white shadow transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
                disabled={loading}
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <Camera aria-hidden="true" size={15} />
              </button>
              <input
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                ref={fileInputRef}
                type="file"
              />
            </>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 flex flex-col gap-5">
        {/* Họ tên */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-name">
            Họ tên
          </label>
          {isEdit ? (
            <input
              className={`w-full rounded-lg border px-4 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-[#5F6FFF]"
              }`}
              disabled={loading}
              id="profile-name"
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => {
                  if (!prev.name) return prev;
                  const next = { ...prev };
                  delete next.name;
                  return next;
                });
              }}
              type="text"
              value={formData.name}
            />
          ) : (
            <p className="text-gray-900 text-sm">{userData.name}</p>
          )}
          {isEdit && errors.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-email">
            Email
          </label>
          <p className="text-gray-900 text-sm">{userData.email}</p>
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-phone">
            Số điện thoại
          </label>
          {isEdit ? (
            <input
              className={`w-full rounded-lg border px-4 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-[#5F6FFF]"
              }`}
              disabled={loading}
              id="profile-phone"
              maxLength={10}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/[^0-9]/g, ""),
                }));
                setErrors((prev) => {
                  if (!prev.phone) return prev;
                  const next = { ...prev };
                  delete next.phone;
                  return next;
                });
              }}
              type="text"
              value={formData.phone}
            />
          ) : (
            <p className="text-gray-900 text-sm">{userData.phone}</p>
          )}
          {isEdit && errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone}</span>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-address1">
            Địa chỉ
          </label>
          {isEdit ? (
            <>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                id="profile-address1"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                value={formData.address.line1}
              />
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                id="profile-address2"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                value={formData.address.line2}
              />
            </>
          ) : (
            <p className="text-gray-900 text-sm">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>

        {/* Giới tính */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-gender">
            Giới tính
          </label>
          {isEdit ? (
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              id="profile-gender"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={formData.gender}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          ) : (
            <p className="text-gray-900 text-sm">{userData.gender}</p>
          )}
        </div>

        {/* Ngày sinh */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-dob">
            Ngày sinh
          </label>
          {isEdit ? (
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              id="profile-dob"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dob: e.target.value }))
              }
              type="date"
              value={formData.dob}
            />
          ) : (
            <p className="text-gray-900 text-sm">
              {formatDisplayDate(userData.dob)}
            </p>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        {isEdit ? (
          <div className="flex gap-4">
            <button
              className="cursor-pointer rounded-full border border-gray-300 px-8 py-2.5 font-medium text-gray-700 text-sm transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-50"
              disabled={loading}
              onClick={cancelEdit}
              type="button"
            >
              Hủy
            </button>
            <button
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#5F6FFF] px-10 py-2.5 font-medium text-sm text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
              disabled={loading}
              onClick={updateUserProfileData}
              type="button"
            >
              {loading ? "Đang lưu..." : "Lưu thông tin"}
            </button>
          </div>
        ) : (
          <button
            className="cursor-pointer rounded-full bg-[#5F6FFF] px-10 py-2.5 font-medium text-sm text-white transition-all hover:opacity-90"
            onClick={startEdit}
            type="button"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
