import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  amount: { required: true, type: Number },
  cancelled: { default: false, type: Boolean },
  date: { required: true, type: Number },
  docData: { required: true, type: Object },
  docId: { required: true, type: String },
  isCompleted: { default: false, type: Boolean },
  payment: { default: false, type: Boolean },
  slotDate: { required: true, type: String },
  slotTime: { required: true, type: String },
  userData: { required: true, type: Object },
  userId: { required: true, type: String },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
