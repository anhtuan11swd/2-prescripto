import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Đã kết nối database");
  });

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "prescripto",
  });
};

export default connectDB;
