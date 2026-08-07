import "dotenv/config";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import {
  bookAppointmentSchema,
  cancelAppointmentSchema,
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
} from "../utils/validate.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

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

const getDoctors = async (_req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    res.json({ doctors, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const result = bookAppointmentSchema.safeParse(req.body);

    if (!result.success) {
      return res.json({
        message: result.error.issues[0].message,
        success: false,
      });
    }

    const { docId, slotDate, slotTime } = result.data;
    const userId = req.userId;

    const docData = await doctorModel
      .findById(docId)
      .select("-password")
      .lean();

    if (!docData) {
      return res.json({ message: "Không tìm thấy bác sĩ", success: false });
    }

    if (!docData.available) {
      return res.json({
        message: "Bác sĩ hiện không nhận lịch",
        success: false,
      });
    }

    const slotsBooked = { ...docData.slots_booked };

    if (slotsBooked[slotDate]) {
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({
          message: "Khung giờ này đã được đặt",
          success: false,
        });
      }
      slotsBooked[slotDate].push(slotTime);
    } else {
      slotsBooked[slotDate] = [slotTime];
    }

    const userData = await userModel
      .findById(userId)
      .select("-password")
      .lean();

    delete docData.slots_booked;

    const appointmentData = {
      amount: docData.fees,
      date: Date.now(),
      docData,
      docId,
      slotDate,
      slotTime,
      userData,
      userId,
    };

    await new appointmentModel(appointmentData).save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    res.json({ message: "Đặt lịch thành công", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req;

    const appointments = await appointmentModel.find({ userId });

    res.json({ appointments, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const result = cancelAppointmentSchema.safeParse(req.body);

    if (!result.success) {
      return res.json({
        message: result.error.issues[0].message,
        success: false,
      });
    }

    const { appointmentId } = result.data;
    const { userId } = req;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ message: "Không tìm thấy lịch hẹn", success: false });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ message: "Không được phép thao tác", success: false });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    if (doctorData?.slots_booked[slotDate]) {
      const slotsBooked = doctorData.slots_booked;
      slotsBooked[slotDate] = slotsBooked[slotDate].filter(
        (e) => e !== slotTime,
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

const paymentStripe = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ message: "Không tìm thấy lịch hẹn", success: false });
    }

    if (appointmentData.cancelled) {
      return res.json({ message: "Lịch hẹn đã bị hủy", success: false });
    }

    const { docData, slotDate, slotTime, amount } = appointmentData;
    const [day, month, year] = slotDate.split("_");
    const dateDisplay = `${day} Tháng ${month}, ${year}`;
    const address = `${docData.address.line1}, ${docData.address.line2}`;

    const options = {
      cancel_url: `${process.env.FRONTEND_URL}/my-appointments`,
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY,
            product_data: {
              description: `${docData.speciality}\n${address}\nNgày: ${dateDisplay} · Giờ: ${slotTime}`,
              images: docData.image ? [docData.image] : [],
              name: docData.name,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        appointmentId,
      },
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    };

    const session = await stripeInstance.checkout.sessions.create(options);

    res.json({ session, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      await appointmentModel.findByIdAndUpdate(session.metadata.appointmentId, {
        payment: true,
      });
      res.json({ message: "Payment Successful", success: true });
    } else {
      res.json({ message: "Payment Failed", success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export {
  bookAppointment,
  cancelAppointment,
  getDoctors,
  getProfile,
  listAppointment,
  loginUser,
  paymentStripe,
  registerUser,
  updateProfile,
  verifyStripe,
};
