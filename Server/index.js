import express from "express";
import { PORT } from "./constant.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js"; // ✅ Use import

const app = express();
app.use(express.json());
app.use("/api", userRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
