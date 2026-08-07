import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getDoctors,
  getProfile,
  listAppointment,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Đăng ký tài khoản người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Trần Thị Bình"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "binh@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
userRouter.post("/register", registerUser);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "binh@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *       400:
 *         description: Sai thông tin đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
userRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/v1/user/get-profile:
 *   get:
 *     summary: Lấy thông tin hồ sơ người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy hồ sơ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userData:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     dob:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     address:
 *                       type: object
 *                     image:
 *                       type: string
 *       401:
 *         description: Không có quyền truy cập
 */
userRouter.get("/get-profile", authUser, getProfile);

/**
 * @swagger
 * /api/v1/user/update-profile:
 *   post:
 *     summary: Cập nhật hồ sơ người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - gender
 *               - dob
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Trần Thị Bình"
 *               phone:
 *                 type: string
 *                 example: "0901234567"
 *               gender:
 *                 type: string
 *                 example: "Nữ"
 *               dob:
 *                 type: string
 *                 example: "1990-05-15"
 *               address:
 *                 type: string
 *                 example: '{"line1":"45 Lê Lợi, Quận 3","line2":"TP. Hồ Chí Minh"}'
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cập nhật hồ sơ thành công"
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile,
);

/**
 * @swagger
 * /api/v1/user/doctors:
 *   get:
 *     summary: Lấy danh sách bác sĩ
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 doctors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                       name:
 *                         type: string
 *                         example: "BS. Nguyễn Văn An"
 *                       degree:
 *                         type: string
 *                         example: "Bác sĩ đa khoa"
 *                       speciality:
 *                         type: string
 *                         example: "Bác sĩ đa khoa"
 *                       experience:
 *                         type: string
 *                         example: "4 năm"
 *                       fees:
 *                         type: number
 *                         example: 500000
 *                       address:
 *                         type: object
 *                         properties:
 *                           line1:
 *                             type: string
 *                             example: "123 Nguyễn Huệ, Quận 1"
 *                           line2:
 *                             type: string
 *                             example: "TP. Hồ Chí Minh"
 *                       image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/demo/image/upload/v1/doctors/nguyen-van-an"
 *                       available:
 *                         type: boolean
 *                         example: true
 *                       date:
 *                         type: number
 *                         example: 1786036913000
 *                       slots_booked:
 *                         type: object
 *                         example:
 *                           "5_8_2026":
 *                             - "10:00 AM"
 *                             - "10:30 AM"
 */
userRouter.get("/doctors", getDoctors);

/**
 * @swagger
 * /api/v1/user/book-appointment:
 *   post:
 *     summary: Đặt lịch hẹn
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - docId
 *               - slotDate
 *               - slotTime
 *             properties:
 *               docId:
 *                 type: string
 *                 description: ID bác sĩ (lấy từ GET /api/v1/user/doctors)
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *               slotDate:
 *                 type: string
 *                 description: Ngày khám dạng ngay_thang_nam
 *                 example: "5_8_2026"
 *               slotTime:
 *                 type: string
 *                 description: Khung giờ khám
 *                 example: "10:30 AM"
 *     responses:
 *       200:
 *         description: Đặt lịch thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đặt lịch thành công"
 *       default:
 *         description: Lỗi - ví dụ khung giờ đã được đặt trước đó
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Khung giờ này đã được đặt"
 */
userRouter.post("/book-appointment", authUser, bookAppointment);

/**
 * @swagger
 * /api/v1/user/appointments:
 *   get:
 *     summary: Lấy danh sách lịch hẹn của bệnh nhân
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f1a2b3c4d5e6f7a8b9c0d2"
 *                       userId:
 *                         type: string
 *                         example: "64f1a2b3c4d5e6f7a8b9c0d3"
 *                       docId:
 *                         type: string
 *                         example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                       slotDate:
 *                         type: string
 *                         example: "5_8_2026"
 *                       slotTime:
 *                         type: string
 *                         example: "10:30 AM"
 *                       amount:
 *                         type: number
 *                         example: 500000
 *                       date:
 *                         type: number
 *                         example: 1786036913000
 *                       cancelled:
 *                         type: boolean
 *                         example: false
 *                       payment:
 *                         type: boolean
 *                         example: false
 *                       isCompleted:
 *                         type: boolean
 *                         example: false
 *                       docData:
 *                         type: object
 *                         description: Snapshot thông tin bác sĩ tại thời điểm đặt lịch
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "BS. Nguyễn Văn An"
 *                           degree:
 *                             type: string
 *                             example: "Bác sĩ đa khoa"
 *                           speciality:
 *                             type: string
 *                             example: "Bác sĩ đa khoa"
 *                           fees:
 *                             type: number
 *                             example: 500000
 *                           address:
 *                             type: object
 *                             properties:
 *                               line1:
 *                                 type: string
 *                                 example: "123 Nguyễn Huệ, Quận 1"
 *                               line2:
 *                                 type: string
 *                                 example: "TP. Hồ Chí Minh"
 *                           image:
 *                             type: string
 *                             example: "https://res.cloudinary.com/demo/image/upload/v1/doctors/nguyen-van-an"
 *                       userData:
 *                         type: object
 *                         description: Snapshot thông tin bệnh nhân tại thời điểm đặt lịch
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Trần Thị Cẩm"
 *                           email:
 *                             type: string
 *                             example: "cam@example.com"
 *                           phone:
 *                             type: string
 *                             example: "0901234567"
 */
userRouter.get("/appointments", authUser, listAppointment);

/**
 * @swagger
 * /api/v1/user/cancel-appointment:
 *   post:
 *     summary: Hủy lịch hẹn
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: ID lịch hẹn (trừ từ GET /api/v1/user/appointments)
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d2"
 *     responses:
 *       200:
 *         description: Hủy lịch thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đã hủy lịch hẹn"
 *       default:
 *         description: Lỗi - ví dụ không được phép hủy lịch của người khác
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Không được phép thao tác"
 */
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
