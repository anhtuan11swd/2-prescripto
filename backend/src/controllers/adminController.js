import "dotenv/config";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.js";
import doctorModel from "../models/doctorModel.js";
import { doctorSchema } from "../utils/validate.js";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    }
    return res.json({
      message: "Thông tin đăng nhập không hợp lệ",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const addDoctorHandler = async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ message: "Ảnh là bắt buộc", success: false });
    }

    const result = doctorSchema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return res.json({ message: errorMessage, success: false });
    }

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = result.data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "2-prescripto/doctors",
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      about,
      address: JSON.parse(address),
      date: Date.now(),
      degree,
      email,
      experience,
      fees: Number(fees),
      image: imageUrl,
      name,
      password: hashedPassword,
      speciality,
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ message: "Bác sĩ đã được thêm", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const addDoctor = [upload.single("image"), addDoctorHandler];

export { addDoctor, loginAdmin };
