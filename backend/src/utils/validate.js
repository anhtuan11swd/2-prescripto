import { z } from "zod";

const isValidInitial = (val) => {
  const dots = (val.match(/\./g) || []).length;
  if (dots > 1) return false;
  if (dots === 0) return true;

  const dot = val.indexOf(".");
  const before = val[dot - 1] ?? "";
  const beforeBefore = val[dot - 2] ?? "";
  const after = val[dot + 1] ?? "";

  if (!/[\p{L}]/u.test(before)) return false;
  if (beforeBefore !== "" && beforeBefore !== " ") return false;
  if (after !== "" && after !== " ") return false;
  return true;
};

const fullNameSchema = z
  .string("Tên là bắt buộc")
  .trim()
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(100, "Tên không được quá 100 ký tự")
  .regex(
    /^[\p{L}\s'.-]+$/u,
    "Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch ngang, dấu nháy và dấu chấm",
  )
  .regex(/^[\p{L}]/u, "Tên phải bắt đầu bằng chữ cái")
  .regex(/[\p{L}]$/u, "Tên phải kết thúc bằng chữ cái")
  .refine(
    isValidInitial,
    "Dấu chấm chỉ được dùng cho chữ viết tắt (vd: J. Robert)",
  );

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(64, "Mật khẩu không được quá 64 ký tự")
  .regex(
    /^[\x21-\x7E]+$/,
    "Mật khẩu chỉ được chứa ký tự in được, không có khoảng trắng, emoji hoặc ký tự đặc biệt Unicode",
  )
  .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái thường")
  .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái hoa")
  .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số")
  .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt");

const userPhoneSchema = z
  .string("Số điện thoại là bắt buộc")
  .trim()
  .regex(
    /^0(3|5|7|8|9)\d{8}$/,
    "Số điện thoại không hợp lệ. Nhập số di động Việt Nam 10 số (03x, 05x, 07x, 08x, 09x)",
  );

const registerUserSchema = z.object({
  email: z.string("Email là bắt buộc").email("Vui lòng nhập email hợp lệ"),
  name: fullNameSchema,
  password: passwordSchema,
});

const loginUserSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

const updateProfileSchema = z.object({
  address: z
    .string()
    .min(1, "Địa chỉ là bắt buộc")
    .refine((val) => {
      try {
        const parsed = JSON.parse(val);
        return parsed.line1 !== undefined && parsed.line2 !== undefined;
      } catch {
        return false;
      }
    }, "Địa chỉ phải là JSON hợp lệ với line1 và line2"),
  dob: z.string().min(1, "Ngày sinh là bắt buộc"),
  gender: z.string().min(1, "Giới tính là bắt buộc"),
  name: fullNameSchema,
  phone: userPhoneSchema,
});

const doctorSchema = z.object({
  about: z.string().min(1, "Giới thiệu là bắt buộc"),
  address: z.string().refine((val) => {
    try {
      const parsed = JSON.parse(val);
      return parsed.line1 !== undefined && parsed.line2 !== undefined;
    } catch {
      return false;
    }
  }, "Địa chỉ phải là JSON hợp lệ với line1 và line2"),
  degree: z.string().min(1, "Bằng cấp là bắt buộc"),

  email: z.string().email("Vui lòng nhập email hợp lệ"),
  experience: z.string().min(1, "Kinh nghiệm là bắt buộc"),
  fees: z
    .string()
    .min(1, "Phí là bắt buộc")
    .refine((val) => Number(val) >= 15000, "Phí tối thiểu là 15.000₫"),
  name: z
    .string()
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được quá 100 ký tự")
    .regex(
      /^[a-zA-ZÀ-ỹ\s'.-]+$/,
      "Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch ngang, dấu nháy và dấu chấm",
    ),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(64, "Mật khẩu không được quá 64 ký tự")
    .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái thường")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái hoa")
    .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số")
    .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),

  speciality: z.string().min(1, "Chuyên khoa là bắt buộc"),
});

export {
  doctorSchema,
  fullNameSchema,
  loginUserSchema,
  passwordSchema,
  registerUserSchema,
  updateProfileSchema,
  userPhoneSchema,
};
