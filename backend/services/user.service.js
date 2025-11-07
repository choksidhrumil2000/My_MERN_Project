const { User } = require("../models");

const createUser = async (userData) => await User.create(userData);

const getUserByUserId = async (userId) => await User.findOne({ _id: userId });

const getUserbyEmail = async (email) => await User.findOne({ email });

const getUsers = async () => await User.find({});

const deleteUserById = async (userId) => await User.deleteOne({ _id: userId });

module.exports = {
  getUserByUserId,
  createUser,
  getUserbyEmail,
  getUsers,
  deleteUserById,
};
