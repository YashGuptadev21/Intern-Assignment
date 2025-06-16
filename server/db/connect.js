const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,
      {
        dbName: "Assignment",
      }
    );
    console.log("Database Connected");
  } catch (err) {
    console.error("MongoDb Connection Failed", err.message);
  }
};

module.exports = dbConnection;
