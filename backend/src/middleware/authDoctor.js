import "dotenv/config";
import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({
        message: "Không có quyền truy cập, vui lòng đăng nhập lại",
        success: false,
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    if (!req.body) {
      req.body = {};
    }
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default authDoctor;
