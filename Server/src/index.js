import express from "express";
import { connectMongoDb } from "../connection.js"; 
import { logReqRes } from "../middlewares/index.js"; 
import userRouter from "../routes/user.js"; 

const app = express();
const PORT = 5006;

connectMongoDb("mongodb://127.0.0.1:27017/app-1").then(() =>
  console.log("MongoDB Connected")
);

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running in dope mode on PORT ${PORT}`);
});
