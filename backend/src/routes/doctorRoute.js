import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorProfile,
  loginDoctor,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

/**
 * @swagger
 * /api/v1/doctor/login:
 *   post:
 *     summary: Đăng nhập bác sĩ
 *     tags: [Doctor]
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
 *                 example: "nguyenvanan@gmail.com"
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
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Thông tin đăng nhập không hợp lệ
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
 *                   example: "Thông tin đăng nhập không hợp lệ"
 */
doctorRouter.post("/login", loginDoctor);

/**
 * @swagger
 * /api/v1/doctor/appointments:
 *   get:
 *     summary: Lấy danh sách lịch hẹn của bác sĩ
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token bác sĩ
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
 *                         example: "7_8_2026"
 *                       slotTime:
 *                         type: string
 *                         example: "10:30 AM"
 *                       amount:
 *                         type: number
 *                         example: 500000
 *                       date:
 *                         type: number
 *                         example: 1754563200000
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
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "BS. Nguyễn Văn An"
 *                           speciality:
 *                             type: string
 *                             example: "Bác sĩ đa khoa"
 *                           image:
 *                             type: string
 *                             example: "https://res.cloudinary.com/demo/image/upload/v1/doctors/an"
 *                       userData:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Trần Thị Bình"
 *                           dob:
 *                             type: string
 *                             example: "1995-05-15"
 *                           image:
 *                             type: string
 *                             example: "data:image/png;base64,..."
 *       401:
 *         description: Không có quyền truy cập
 */
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

/**
 * @swagger
 * /api/v1/doctor/complete-appointment:
 *   post:
 *     summary: Đánh dấu lịch hẹn hoàn thành
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         schema:
 *           type: string
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
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d2"
 *     responses:
 *       200:
 *         description: Hoàn thành thành công
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
 *                   example: "Appointment Completed"
 *       400:
 *         description: Yêu cầu không hợp lệ
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
 *                   example: "Invalid Request"
 */
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);

/**
 * @swagger
 * /api/v1/doctor/cancel-appointment:
 *   post:
 *     summary: Hủy lịch hẹn (Bác sĩ)
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         schema:
 *           type: string
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
 *                   example: "Appointment Cancelled"
 *       400:
 *         description: Yêu cầu không hợp lệ
 */
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);

/**
 * @swagger
 * /api/v1/doctor/dashboard:
 *   get:
 *     summary: Lấy dữ liệu thống kê Dashboard bác sĩ
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 dashData:
 *                   type: object
 *                   properties:
 *                     earnings:
 *                       type: number
 *                       example: 2500000
 *                     appointments:
 *                       type: number
 *                       example: 22
 *                     patients:
 *                       type: number
 *                       example: 17
 *                     latestAppointments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64f1a2b3c4d5e6f7a8b9c0d2"
 *                           slotDate:
 *                             type: string
 *                             example: "7_8_2026"
 *                           slotTime:
 *                             type: string
 *                             example: "10:30 AM"
 *                           cancelled:
 *                             type: boolean
 *                           isCompleted:
 *                             type: boolean
 *                           userData:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Trần Thị Bình"
 *                               image:
 *                                 type: string
 *       401:
 *         description: Không có quyền truy cập
 */
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

/**
 * @swagger
 * /api/v1/doctor/profile:
 *   get:
 *     summary: Lấy thông tin hồ sơ bác sĩ
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
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
 *                 profileData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                     name:
 *                       type: string
 *                       example: "BS. Nguyễn Văn An"
 *                     email:
 *                       type: string
 *                       example: "nguyenvanan@gmail.com"
 *                     speciality:
 *                       type: string
 *                       example: "Bác sĩ đa khoa"
 *                     degree:
 *                       type: string
 *                       example: "Bác sĩ chuyên khoa I"
 *                     experience:
 *                       type: string
 *                       example: "4 Năm"
 *                     fees:
 *                       type: number
 *                       example: 500000
 *                     address:
 *                       type: object
 *                       properties:
 *                         line1:
 *                           type: string
 *                           example: "123 Nguyễn Huệ, Quận 1"
 *                         line2:
 *                           type: string
 *                           example: "TP. Hồ Chí Minh"
 *                     image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1/doctors/an"
 *                     available:
 *                       type: boolean
 *                       example: true
 *                     about:
 *                       type: string
 *                       example: "BS. Nguyễn Văn An là bác sĩ đa khoa với 4 năm kinh nghiệm..."
 *       401:
 *         description: Không có quyền truy cập
 */
doctorRouter.get("/profile", authDoctor, doctorProfile);

/**
 * @swagger
 * /api/v1/doctor/update-profile:
 *   post:
 *     summary: Cập nhật hồ sơ bác sĩ
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fees
 *               - address
 *               - available
 *             properties:
 *               fees:
 *                 type: number
 *                 example: 600000
 *               address:
 *                 type: object
 *                 properties:
 *                   line1:
 *                     type: string
 *                     example: "45 Lê Lợi, Quận 3"
 *                   line2:
 *                     type: string
 *                     example: "TP. Hồ Chí Minh"
 *               available:
 *                 type: boolean
 *                 example: true
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
 *                   example: "Profile Updated"
 *       401:
 *         description: Không có quyền truy cập
 */
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
