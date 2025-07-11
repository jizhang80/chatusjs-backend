// src/services/userService.js
const User = require("../models/userModel");
const hashPassword = require("../utils/hashPassword");

/**
 * Creates a new user in the database
 * @param {Object} userData - An object containing name, email, and password
 * @returns {Promise<Object>} The created user object
 */

exports.createUser = async function createUser(userData) {
  try {
    const { name, email, password } = userData;

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Retrieves all users from the database
 */
exports.getAllUsers = async function getAllUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Retrieves a user by ID
 * @param {String} userId - The MongoDB ObjectId of the user
 * @returns {Promise<Object|null>} The user object or null if not found
 */
exports.getUserById = async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

/**
 * Delete a user by ID
 * @param {string} userId - The ID of the user to delete
 * @returns {Promise<Object|null>} The deleted user object, or null if not found
 */
exports.deleteUser = async function deleteUser(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
