const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", require("./routes/kambam"));

app.listen(port, () => {
  console.log(`Listening host http://localhost:${port}`);
});
