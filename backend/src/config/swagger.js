import swaggerJsdoc from "swagger-jsdoc";

const options = {
  apis: ["./src/routes/*.js"],
  definition: {
    info: {
      description: "API quản lý phòng khám đặt lịch hẹn khám bệnh",
      title: "Prescripto API",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Development server",
        url: "http://localhost:4000",
      },
    ],
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
