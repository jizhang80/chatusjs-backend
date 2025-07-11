// src/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.getAllChats);
router.post("/", chatController.createChat);
router.get("/:id", chatController.getChatById);
router.post("/:id", chatController.addMessageToChat);
router.delete("/:id", chatController.deleteChat);

module.exports = router;
