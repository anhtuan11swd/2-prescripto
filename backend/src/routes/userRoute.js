import express from "express";
import {
  getProfile,
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

export default userRouter;
