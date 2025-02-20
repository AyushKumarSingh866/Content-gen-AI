import express from "express";
import { PORT } from "./constant.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use("/api", userRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on PORT ${PORT}`);
});
