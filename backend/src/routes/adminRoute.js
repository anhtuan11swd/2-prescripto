import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  changeAvailability,
  loginAdmin,
} from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Đăng nhập admin
 *     tags: [Admin]
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
 *                 example: "admin@prescripto.com"
 *                 description: Email admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Admin123!"
 *                 description: Mật khẩu admin
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
 *                   description: JWT token
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
adminRouter.post("/login", loginAdmin);

/**
 * @swagger
 * /api/v1/admin/add-doctor:
 *   post:
 *     summary: Thêm bác sĩ mới
 *     tags: [Admin]
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
 *               - email
 *               - password
 *               - speciality
 *               - degree
 *               - experience
 *               - about
 *               - fees
 *               - address
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "BS. Nguyễn Văn An"
 *                 description: Tên bác sĩ
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "nguyenvanan@gmail.com"
 *                 description: Email bác sĩ
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *                 description: Mật khẩu (ít nhất 8 ký tự, có chữ hoa, thường, số và ký tự đặc biệt)
 *               speciality:
 *                 type: string
 *                 example: "Bác sĩ đa khoa"
 *                 description: Chuyên khoa
 *                 enum:
 *                   - Bác sĩ đa khoa
 *                   - Bác sĩ phụ khoa
 *                   - Bác sĩ da liễu
 *                   - Bác sĩ nhi khoa
 *                   - Bác sĩ thần kinh
 *                   - Bác sĩ tiêu hóa
 *               degree:
 *                 type: string
 *                 example: "Bác sĩ đa khoa"
 *                 description: Bằng cấp
 *               experience:
 *                 type: string
 *                 example: "4 năm"
 *                 description: Kinh nghiệm
 *               about:
 *                 type: string
 *                 example: "BS. Nguyễn Văn An là bác sĩ đa khoa với 4 năm kinh nghiệm trong lĩnh vực khám và điều trị bệnh tổng quát."
 *                 description: Thông tin giới thiệu
 *               fees:
 *                 type: string
 *                 example: "500000"
 *                 description: Phí khám (đồng)
 *               address:
 *                 type: string
 *                 example: '{"line1":"123 Nguyễn Huệ, Quận 1","line2":"TP. Hồ Chí Minh"}'
 *                 description: Địa chỉ (JSON string với line1 và line2)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh bác sĩ
 *     responses:
 *       200:
 *         description: Thêm bác sĩ thành công
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
 *                   example: "Bác sĩ đã được thêm"
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
 *                   example: "Ảnh là bắt buộc"
 */
adminRouter.post("/add-doctor", authAdmin, addDoctor);

/**
 * @swagger
 * /api/v1/admin/all-doctors:
 *   get:
 *     summary: Lấy danh sách tất cả bác sĩ
 *     tags: [Admin]
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
 *                       email:
 *                         type: string
 *                         example: "nguyenvanan@gmail.com"
 *                       speciality:
 *                         type: string
 *                         example: "Bác sĩ đa khoa"
 *                       degree:
 *                         type: string
 *                         example: "Bác sĩ đa khoa"
 *                       experience:
 *                         type: string
 *                         example: "4 năm"
 *                       about:
 *                         type: string
 *                         example: "BS. Nguyễn Văn An là bác sĩ đa khoa..."
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
 *                         example: "https://res.cloudinary.com/..."
 *                       available:
 *                         type: boolean
 *                         example: true
 *                       date:
 *                         type: number
 *                         example: 1693500000000
 *       401:
 *         description: Không có quyền truy cập
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
 *                   example: "Không có quyền truy cập"
 */
adminRouter.get("/all-doctors", authAdmin, allDoctors);

/**
 * @swagger
 * /api/v1/admin/change-availability:
 *   post:
 *     summary: Đổi trạng thái hoạt động của bác sĩ
 *     tags: [Admin]
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
 *             properties:
 *               docId:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                 description: ID bác sĩ cần đổi trạng thái
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
 *                   example: "Trạng thái đã được cập nhật"
 *       400:
 *         description: Không tìm thấy bác sĩ
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
 *                   example: "Không tìm thấy bác sĩ"
 *       401:
 *         description: Không có quyền truy cập
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
 *                   example: "Không có quyền truy cập"
 */
adminRouter.post("/change-availability", authAdmin, changeAvailability);

/**
 * @swagger
 * /api/v1/admin/appointments:
 *   get:
 *     summary: Lấy danh sách toàn bộ lịch hẹn
 *     tags: [Admin]
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
 *                       userId:
 *                         type: string
 *                       docId:
 *                         type: string
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
 *                       cancelled:
 *                         type: boolean
 *                       payment:
 *                         type: boolean
 *                       isCompleted:
 *                         type: boolean
 *                       docData:
 *                         type: object
 *                       userData:
 *                         type: object
 *       401:
 *         description: Không có quyền truy cập
 */
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);

/**
 * @swagger
 * /api/v1/admin/cancel-appointment:
 *   post:
 *     summary: Hủy lịch hẹn (Admin)
 *     tags: [Admin]
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
 *                 description: ID lịch hẹn cần hủy
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
 *       400:
 *         description: Không tìm thấy lịch hẹn
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
 *                   example: "Không tìm thấy lịch hẹn"
 *       401:
 *         description: Không có quyền truy cập
 */
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Lấy dữ liệu thống kê Dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *                     doctors:
 *                       type: number
 *                       example: 15
 *                     appointments:
 *                       type: number
 *                       example: 128
 *                     patients:
 *                       type: number
 *                       example: 214
 *                     latestAppointments:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Không có quyền truy cập
 */
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
