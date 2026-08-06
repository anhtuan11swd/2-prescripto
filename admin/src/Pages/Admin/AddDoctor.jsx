import axios from "axios";
import { Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.context.js";
import { addDoctorSchema } from "../../utils/validate.js";

const specialityData = [
  "Bác sĩ đa khoa",
  "Bác sĩ phụ khoa",
  "Bác sĩ da liễu",
  "Bác sĩ nhi khoa",
  "Bác sĩ thần kinh",
  "Bác sĩ tiêu hóa",
];

const degreeData = [
  "Bác sĩ nội trú",
  "Bác sĩ chuyên khoa I",
  "Bác sĩ chuyên khoa II",
  "Thạc sĩ y khoa",
  "Tiến sĩ y khoa",
  "Phó giáo sư",
  "Giáo sư",
];

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Năm");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Bác sĩ đa khoa");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const { backendUrl, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const resetForm = () => {
    setDocImg(false);
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setExperience("1 Năm");
    setFees("");
    setAbout("");
    setSpeciality("Bác sĩ đa khoa");
    setDegree("");
    setAddress1("");
    setAddress2("");
    setErrors({});
  };

  const showFieldsError = (error) =>
    Object.fromEntries(
      (error?.issues ?? []).map((issue) => [issue.path[0], issue.message]),
    );

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!docImg) {
      toast.error("Chưa chọn ảnh bác sĩ");
      return;
    }

    const result = addDoctorSchema.safeParse({
      about,
      address1,
      address2,
      degree,
      email,
      experience,
      fees,
      name,
      password,
      speciality,
    });

    if (!result.success) {
      setErrors(showFieldsError(result.error));
      toast.error(result.error.issues[0].message);
      return;
    }

    setErrors({});
    setLoading(true);

    const formData = new FormData();
    formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", fees);
    formData.append("about", about);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append(
      "address",
      JSON.stringify({ line1: address1, line2: address2 }),
    );

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/admin/add-doctor`,
        formData,
        {
          headers: { atoken: aToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
        navigate("/doctor-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50";
  const inputErrorClass =
    "w-full rounded-lg border border-red-400 px-4 py-2.5 text-sm outline-none transition-colors focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50";
  const labelClass = "text-gray-700 text-sm";
  const errorClass = "text-red-500 text-xs";

  const inputByField = (field) =>
    errors[field] ? inputErrorClass : inputClass;
  const renderFieldError = (field) =>
    errors[field] ? <span className={errorClass}>{errors[field]}</span> : null;

  return (
    <form className="flex max-w-3xl flex-col gap-6" onSubmit={onSubmitHandler}>
      <p className="font-semibold text-gray-900 text-lg">Thêm bác sĩ</p>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col items-center gap-3">
          <button
            className="relative flex h-44 w-44 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 border-dashed bg-gray-50 text-gray-400 transition-colors hover:border-[#5F6FFF] hover:text-[#5F6FFF] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-400"
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            {docImg ? (
              <>
                <img
                  alt="Ảnh bác sĩ"
                  className="h-full w-full object-cover"
                  src={URL.createObjectURL(docImg)}
                />
                <button
                  aria-label="Xóa ảnh bác sĩ"
                  className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-600 shadow transition-colors hover:bg-red-500 hover:text-white"
                  onClick={() => setDocImg(false)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </>
            ) : (
              <>
                <img alt="" className="w-10" src={assets.upload_area} />
                <span className="text-xs">Chọn ảnh bác sĩ</span>
              </>
            )}
          </button>
          <input
            accept="image/*"
            className="hidden"
            onChange={(e) => setDocImg(e.target.files[0])}
            ref={fileInputRef}
            type="file"
          />
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="name">
              Họ tên
            </label>
            <input
              className={inputByField("name")}
              disabled={loading}
              id="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
            {renderFieldError("name")}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              className={inputByField("email")}
              disabled={loading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
            />
            {renderFieldError("email")}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                className={`${inputByField("password")} pr-10`}
                disabled={loading}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" size={18} />
                ) : (
                  <Eye aria-hidden="true" size={18} />
                )}
              </button>
            </div>
            {renderFieldError("password")}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="experience">
              Kinh nghiệm
            </label>
            <select
              className={inputClass}
              disabled={loading}
              id="experience"
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
            >
              <option value="1 Năm">1 Năm</option>
              <option value="2 Năm">2 Năm</option>
              <option value="3 Năm">3 Năm</option>
              <option value="4 Năm">4 Năm</option>
              <option value="5 Năm">5 Năm</option>
              <option value="6 Năm">6 Năm</option>
              <option value="7 Năm">7 Năm</option>
              <option value="8 Năm">8 Năm</option>
              <option value="9 Năm">9 Năm</option>
              <option value="10 Năm">10 Năm</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="fees">
              Phí khám (₫)
            </label>
            <input
              className={inputByField("fees")}
              disabled={loading}
              id="fees"
              min="15000"
              onChange={(e) => setFees(e.target.value)}
              type="number"
              value={fees}
            />
            {renderFieldError("fees")}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="speciality">
              Chuyên khoa
            </label>
            <select
              className={inputClass}
              disabled={loading}
              id="speciality"
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
            >
              {specialityData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="degree">
              Bằng cấp
            </label>
            <select
              className={inputByField("degree")}
              disabled={loading}
              id="degree"
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
            >
              <option value="">-- Chọn bằng cấp --</option>
              {degreeData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {renderFieldError("degree")}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="address1">
              Địa chỉ 1
            </label>
            <input
              className={inputByField("address1")}
              disabled={loading}
              id="address1"
              onChange={(e) => setAddress1(e.target.value)}
              type="text"
              value={address1}
            />
            {renderFieldError("address1")}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="address2">
              Địa chỉ 2
            </label>
            <input
              className={inputByField("address2")}
              disabled={loading}
              id="address2"
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              value={address2}
            />
            {renderFieldError("address2")}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="about">
          Giới thiệu
        </label>
        <textarea
          className={`${inputByField("about")} min-h-24 resize-none`}
          disabled={loading}
          id="about"
          onChange={(e) => setAbout(e.target.value)}
          value={about}
        />
        {renderFieldError("about")}
      </div>

      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5F6FFF] py-2.5 font-medium text-sm text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50 sm:w-40"
        disabled={loading}
        type="submit"
      >
        {loading && (
          <Loader2 aria-hidden="true" className="animate-spin" size={16} />
        )}
        Thêm bác sĩ
      </button>
    </form>
  );
};

export default AddDoctor;
