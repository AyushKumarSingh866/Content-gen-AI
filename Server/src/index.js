const express = require("express");
const path = require('path');
const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRoute =require('./routes/user')
const app = express();
const PORT = 5006;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use('/', staticRouter);

app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } 
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error in URL redirection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => console.log(`🚀 Server started at PORT: ${PORT}`));
