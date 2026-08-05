import cors from "cors";
import express from "express";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();

app.get("/", (_req, res) => {
  res.send("API đang hoạt động");
});

app.listen(port, () => {
  console.log("Server đã khởi động", port);
});
