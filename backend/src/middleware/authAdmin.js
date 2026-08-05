import "dotenv/config";
import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        message: "Không có quyền truy cập, vui lòng đăng nhập lại",
        success: false,
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        message: "Không có quyền truy cập, vui lòng đăng nhập lại",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default authAdmin;
