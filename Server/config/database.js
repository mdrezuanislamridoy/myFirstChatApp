require("dotenv").config();
const mongoose = require("mongoose");

const database = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("database connected");
};

module.exports = database;
