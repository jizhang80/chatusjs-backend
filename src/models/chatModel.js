const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatMessageSchema = new mongoose.Schema(
  {
    userMessage: { type: String, required: true },
    assistantMessage: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
); // prevent _id for each nested doc if not needed

const chatSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user model
  title: { type: String, default: "Untitled Chat" },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  messages: [chatMessageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
