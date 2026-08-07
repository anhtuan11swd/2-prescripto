import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        message: "Thông tin đăng nhập không hợp lệ",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({
        message: "Thông tin đăng nhập không hợp lệ",
        success: false,
      });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    res.json({ appointments, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ message: "Lịch hẹn đã hoàn thành", success: true });
    }

    return res.json({ message: "Yêu cầu không hợp lệ", success: false });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      const { slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);

      if (doctorData?.slots_booked?.[slotDate]) {
        const slotsBooked = doctorData.slots_booked;
        slotsBooked[slotDate] = slotsBooked[slotDate].filter(
          (item) => item !== slotTime,
        );

        if (slotsBooked[slotDate].length === 0) {
          delete slotsBooked[slotDate];
        }

        await doctorModel.findByIdAndUpdate(docId, {
          slots_booked: slotsBooked,
        });
      }

      return res.json({ message: "Lịch hẹn đã bị hủy", success: true });
    }

    return res.json({ message: "Yêu cầu không hợp lệ", success: false });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    const patients = [];

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }

      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      earnings,
      latestAppointments: appointments.reverse().slice(0, 5),
      patients: patients.length,
    };

    res.json({ dashData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ profileData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, {
      address,
      available,
      fees,
    });

    res.json({ message: "Cập nhật hồ sơ thành công", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorProfile,
  loginDoctor,
  updateDoctorProfile,
};
