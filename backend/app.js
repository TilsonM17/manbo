const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/kambam");

dotenv.config();

const app = express();
const port = process.env.PORT || 8089;

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/docker-node-app"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World ");
});

app.use("/api", router);


app.listen(port, () => {
  console.log(`Listening host http://localhost:${port}`)
})