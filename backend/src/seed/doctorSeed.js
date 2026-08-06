import "dotenv/config";
import { register } from "node:module";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

register("./assets-loader.js", import.meta.url);
const { doctors: seedData } = await import(
  "../../../frontend/src/assets/assets.js"
);

const SEED_PASSWORD = process.env.SEED_DOCTOR_PASSWORD || "Prescripto@123";
const IMAGE_FOLDER = "2-prescripto/doctors";

const slugifyName = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/BS\.?|TS\.?|ThS\.?/gi, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .join(".");

const seedDoctors = async () => {
  const created = [];

  try {
    const existing = await doctorModel.countDocuments();
    if (existing > 0) {
      console.log(`[seed] Bỏ qua: đã có ${existing} bác sĩ trong dữ liệu`);
      return;
    }

    console.log(`[seed] Bắt đầu seeding ${seedData.length} bác sĩ...`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(SEED_PASSWORD, salt);

    for (const doctor of seedData) {
      const email =
        doctor.email || `${slugifyName(doctor.name) || "doctor"}@prescripto.vn`;

      let image;
      if (doctor.image?.startsWith("http")) {
        image = doctor.image;
      } else {
        const upload = await cloudinary.uploader.upload(doctor.image, {
          folder: IMAGE_FOLDER,
          resource_type: "image",
        });
        image = upload.secure_url;
      }

      const newDoctor = new doctorModel({
        about: doctor.about,
        address: doctor.address,
        available: doctor.available ?? true,
        date: Date.now(),
        degree: doctor.degree,
        email,
        experience: doctor.experience,
        fees: Number(doctor.fees),
        image,
        name: doctor.name,
        password: hashedPassword,
        speciality: doctor.speciality,
      });

      await newDoctor.save();
      created.push(newDoctor._id);
      console.log(`[seed] Đã thêm: ${doctor.name}`);
    }

    console.log(`[seed] Hoàn tất: ${created.length} bác sĩ đã được tạo`);
  } catch (error) {
    if (created.length > 0) {
      await doctorModel.deleteMany({ _id: { $in: created } });
      console.log(
        `[seed] Đã xóa ${created.length} bác sĩ đã tạo để reset trạng thái`,
      );
    }
    console.log("[seed] Thất bại:", error.message);
  }
};

export default seedDoctors;
