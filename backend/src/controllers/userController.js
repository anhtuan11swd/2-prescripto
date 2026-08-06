import "dotenv/config";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import {
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
} from "../utils/validate.js";

const registerUser = async (req, res) => {
  try {
    const result = registerUserSchema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return res.json({ message: errorMessage, success: false });
    }

    const { name, email, password } = result.data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      email,
      name,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return res.json({ message: errorMessage, success: false });
    }

    const { email, password } = result.data;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ message: "Tài khoản không tồn tại", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Mật khẩu không đúng", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    const result = updateProfileSchema.safeParse({
      address,
      dob,
      gender,
      name,
      phone,
    });

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return res.json({ message: errorMessage, success: false });
    }

    await userModel.findByIdAndUpdate(userId, {
      address: JSON.parse(result.data.address),
      dob: result.data.dob,
      gender: result.data.gender,
      name: result.data.name,
      phone: result.data.phone,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "2-prescripto/users",
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ message: "Cập nhật hồ sơ thành công", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export { getProfile, loginUser, registerUser, updateProfile };
