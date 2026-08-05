import { z } from "zod";

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
  fees: z.string().min(1, "Phí là bắt buộc"),
  name: z
    .string()
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được quá 100 ký tự")
    .regex(
      /^[a-zA-ZÀ-ỹ\s'-]+$/,
      "Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch ngang và dấu nháy đơn",
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

export { doctorSchema };
