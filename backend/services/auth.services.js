const { User } = require("../models/index");

const getUserByEmail = async (email) => await User.findOne({ email });

const createUser = async ({ name, email, password, role }) => {
  const user = await User.create({ name, email, password, role });
  return user;
};
module.exports = {
  createUser,
  getUserByEmail,
  // loginUser,
};
