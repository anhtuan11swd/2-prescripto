import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { default: { line1: "", line2: "" }, type: Object },
  dob: { default: "Not Selected", type: String },
  email: { required: true, type: String, unique: true },
  gender: { default: "Not Selected", type: String },
  image: {
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    type: String,
  },
  name: { required: true, type: String },
  password: { required: true, type: String },
  phone: { default: "0000000000", type: String },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
