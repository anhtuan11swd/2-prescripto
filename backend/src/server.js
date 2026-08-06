import cors from "cors";
import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import swaggerSpec from "./config/swagger.js";
import adminRouter from "./routes/adminRoute.js";
import seedDoctors from "./seed/doctorSeed.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/admin", adminRouter);

app.get("/", (_req, res) => {
  res.send("API đang hoạt động");
});

const startServer = async () => {
  await connectDB();
  connectCloudinary();
  await seedDoctors();

  app.listen(port, () => {
    console.log("Server đã khởi động", port);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
  });
};

startServer();
