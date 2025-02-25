import express from "express";
import { options, PORT } from "./constant.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();
app.use(express.json());

app.use("/api", userRouter);



const swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const port = PORT || 5006;
app.listen(port, () => {
  connectDb();
  console.log(`💦💦💦Server is running on PORT ${port}`);
});
