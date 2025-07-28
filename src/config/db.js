// handle db connection logic

const mongoose = require("mongoose");
require("dotenv").config();

const dbconn = async () => {
  const serverSelectionTimeoutMS = 5000; // 5 seconds when it found connection failed
  const DATABASE_URL = process.env.DATABASE_URL;
  const dbName = process.env.DATABASE_NAME;

  // Prints "Failed 0", "Failed 1", "Failed 2" and then throws an
  // error. Exits after approximately 15 seconds.
  for (let i = 0; i < 3; ++i) {
    try {
      await mongoose.connect(DATABASE_URL, {
        serverSelectionTimeoutMS,
        dbName,
      });
      break;
    } catch (err) {
      console.log("DB connection Failed", i);
      if (i >= 2) {
        throw err;
      }
    }
  }
};

// Log and react to connection state changes
mongoose.connection.on("connected", () => console.log("DB connected"));
mongoose.connection.on("open", () => console.log("DB open"));
mongoose.connection.on("disconnected", () => console.log("DB disconnected"));
mongoose.connection.on("reconnected", () => console.log("DB reconnected"));
mongoose.connection.on("disconnecting", () => console.log("DB disconnecting"));
mongoose.connection.on("close", () => console.log("DB close"));

module.exports = dbconn;
