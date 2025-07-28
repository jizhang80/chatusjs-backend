// server.js
require("dotenv").config();
const app = require("./src/app");
const dbconn = require("./src/config/db");

const PORT = process.env.PORT || 3001;

dbconn()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start app due to DB connection error:", err);
  });
