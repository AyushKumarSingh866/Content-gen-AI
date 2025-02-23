import express from "express";
import { PORT } from "./constant.js"; 
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Content-gen-AI",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5006/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api", userRouter);

connectDb()
  .then(() => {
    app.listen(PORT || 5006, () => {
      console.log(`Server is running on PORT ${PORT || 5006}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });