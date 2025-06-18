const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yashguptadev21:Yash21091@cluster0.qxlzg.mongodb.net/",
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
