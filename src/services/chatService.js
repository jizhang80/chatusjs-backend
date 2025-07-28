const Chat = require("../models/chatModel");

/**
 * Create a new chat
 * @param {Object} chatData - Must include userId and optionally title/messages
 * @returns {Promise<Object>} The created chat document
 */
exports.createChat = async function createChat(chatData) {
  try {
    const chat = new Chat(chatData);
    await chat.save();
    return chat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

/**
 * Get all chats (optionally filter by userId)
 * @param {String} [userId] - Optional filter by userId
 * @returns {Promise<Array>} Array of chat documents
 */
exports.getAllChats = async function getAllChats(userId = null) {
  try {
    const filter = userId ? { userId } : {};
    const chats = await Chat.find(filter).sort({ updated: -1 }); // most recent first
    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

/**
 * Get a chat by its ID
 * @param {String} chatId - MongoDB ObjectId
 * @returns {Promise<Object|null>} Chat document or null
 */
exports.getChatById = async function getChatById(chatId) {
  try {
    const chat = await Chat.findById(chatId);
    return chat;
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    throw error;
  }
};

/**
 * Adds a new message to a chat's messages array
 * @param {String} chatId - The ID of the chat document
 * @param {Object} messageData - { userMessage: String, assistantMessage: String }
 * @returns {Promise<Object|null>} The updated chat document
 */
exports.addMessageToChat = async function addMessageToChat(
  chatId,
  messageData,
) {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: { ...messageData, timestamp: new Date() } },
        $set: { updated: new Date() },
      },
      { new: true }, // return the updated doc
    );

    return updatedChat;
  } catch (error) {
    console.error("Error adding message to chat:", error);
    throw error;
  }
};

/**
 * Delete a message by ID
 * @param {String} chatId - The ID of the chat document
 * @returns {Promise<Object|null>} The deleted chat document
 */
exports.deleteChat = async function deleteChat(chatId) {
  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    return deletedChat;
  } catch (error) {
    console.error("Error adding message to chat:", error);
    throw error;
  }
};
