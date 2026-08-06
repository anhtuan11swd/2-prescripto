import "dotenv/config";
import mongoose from "mongoose";
import connectCloudinary from "../src/config/cloudinary.js";
import connectDB from "../src/config/mongodb.js";
import seedDoctors from "../src/seed/doctorSeed.js";

const run = async () => {
  await connectDB();
  connectCloudinary();
  await seedDoctors();

  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  process.exit(0);
};

run();
