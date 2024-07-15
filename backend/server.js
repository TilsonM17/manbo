const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const port = process.env.APP_PORT || 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.use("/api", require("./routes/kambam"));

app.listen(port, () => {
  console.log(`Listening host http://localhost:${port}`);
});
