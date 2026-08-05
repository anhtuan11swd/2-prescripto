import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    address: {
      line1: "45 Lê Lợi, Quận 3",
      line2: "TP. Hồ Chí Minh",
    },
    dob: "1990-05-15",
    email: "binh@example.com",
    gender: "Nữ",
    image: assets.profile_pic,
    name: "BS. Trần Thị Bình",
    phone: "0901234567",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="mx-auto max-w-2xl py-10">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <img
          alt={userData.name}
          className="h-28 w-28 rounded-full object-cover"
          src={userData.image}
        />
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
              id="profile-name"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              value={userData.name}
            />
          ) : (
            <p className="text-gray-900 text-sm">{userData.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-email">
            Email
          </label>
          {isEdit ? (
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
              id="profile-email"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              value={userData.email}
            />
          ) : (
            <p className="text-gray-900 text-sm">{userData.email}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm" htmlFor="profile-phone">
            Số điện thoại
          </label>
          {isEdit ? (
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
              id="profile-phone"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              type="text"
              value={userData.phone}
            />
          ) : (
            <p className="text-gray-900 text-sm">{userData.phone}</p>
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
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
                id="profile-address1"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line1}
              />
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
                id="profile-address2"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line2}
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
              id="profile-gender"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#5F6FFF]"
              id="profile-dob"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              type="date"
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-900 text-sm">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        <button
          className="cursor-pointer rounded-full bg-[#5F6FFF] px-10 py-2.5 font-medium text-sm text-white transition-all hover:opacity-90"
          onClick={() => setIsEdit(!isEdit)}
          type="button"
        >
          {isEdit ? "Lưu thông tin" : "Chỉnh sửa"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
