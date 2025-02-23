import express from "express";
import { options, PORT } from "./constant.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", userRouter);

app.listen(PORT || 5006, () => {
  connectDb();
  console.log(`Server is running on PORT ${PORT || 5006}`);
});
