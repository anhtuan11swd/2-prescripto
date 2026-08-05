import express from "express";
import { addDoctor } from "../controllers/adminController.js";

const adminRouter = express.Router();

/**
 * @swagger
 * /api/v1/admin/add-doctor:
 *   post:
 *     summary: Thêm bác sĩ mới
 *     tags: [Admin]
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
 *                   example: "Đã thêm bác sĩ"
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
 *                   example: "Hình ảnh là bắt buộc"
 */
adminRouter.post("/add-doctor", addDoctor);

export default adminRouter;
