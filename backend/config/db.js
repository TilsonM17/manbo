const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/docker-node-app");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

connectDB();

module.exports = connectDB;
