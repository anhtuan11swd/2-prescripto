import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    about: { required: true, type: String },
    address: { required: true, type: Object },
    available: { default: true, type: Boolean },
    date: { required: true, type: Number },
    degree: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    experience: { required: true, type: String },
    fees: { required: true, type: Number },
    image: { required: true, type: String },
    name: { required: true, type: String },
    password: { required: true, type: String },
    slots_booked: { default: {}, minimize: false, type: Object },
    speciality: { required: true, type: String },
  },
  { minimize: false },
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
