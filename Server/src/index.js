import express from "express";
import { PORT } from "./constant.js";

const app = express();
app.get("/ayush", (req, res)=> {
res.send("Ayush ")
})
app.listen(PORT, () => {
  console.log(`Server is running on dope mode on PORT ${PORT}`);
});
