const express = require("express");
const {connectMongoDb}= require('../connection')
const{logReqRes}= require("../middlewares");
const userRouter = require("../routes/user")

const app = express();
const PORT = 5006;

connectMongoDb("mongodb://127.0.0.1:27017/app-1").then(()=>console.log("Mongodb Connected"));


app.use(express.urlencoded({extended: false}));

app.use(logReqRes("log.txt"));


  


app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on dope mode on PORT ${PORT}`);
});
