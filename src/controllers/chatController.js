const chatService = require("../services/chatService");

exports.getAllChats = async (req, res) => {
  try {
    const chats = await chatService.getAllChats();
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createChat = async (req, res) => {
  try {
    const chat = await chatService.createChat(req.body);
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getChatById = async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await chatService.getChatById(id);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMessageToChat = async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await chatService.addMessageToChat(id);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(204).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await chatService.deleteChat(id);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(204).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
