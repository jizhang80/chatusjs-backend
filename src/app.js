// src/app.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound"); //add 404 hanlder

const app = express();

app.use(express.json());
app.use(logger); // Custom middleware
app.use("/api/users", userRoutes); // user Routes
app.use("/api/chats", chatRoutes); // chat Routes
app.use(notFound); // add 404 handler

// Health check
app.get("/ping", (_, res) => {
  res.send("pong");
});

module.exports = app;
