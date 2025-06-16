const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    const mongoUri = await mongoose.connect(process.env.DB_URL, {
      dbName: "Assignment",
    });
    console.log("Database Connected");
  } catch (err) {
    console.error("MongoDb Connection Failed", err.message);
  }
};

module.exports = dbConnection;
