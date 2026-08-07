import "dotenv/config";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.js";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
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

const allDoctors = async (_req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ doctors, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.json({ message: "Không tìm thấy bác sĩ", success: false });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ message: "Trạng thái đã được cập nhật", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const addDoctor = [upload.single("image"), addDoctorHandler];

const appointmentsAdmin = async (_req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ appointments, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({
        message: "Không tìm thấy lịch hẹn",
        success: false,
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData?.slots_booked?.[slotDate]) {
      const slotsBooked = doctorData.slots_booked;
      slotsBooked[slotDate] = slotsBooked[slotDate].filter(
        (item) => item !== slotTime,
      );

      if (slotsBooked[slotDate].length === 0) {
        delete slotsBooked[slotDate];
      }

      await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });
    }

    res.json({ message: "Đã hủy lịch hẹn", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const adminDashboard = async (_req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      appointments: appointments.length,
      doctors: doctors.length,
      latestAppointments: appointments.reverse().slice(0, 5),
      patients: users.length,
    };

    res.json({ dashData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  changeAvailability,
  loginAdmin,
};
