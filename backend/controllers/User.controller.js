const { userService } = require("../services");
const ApiError = require("../utils/ApiError");

const addUser = async (req, res) => {
  const userData = req.body;
  const existingUser = await userService.getUserbyEmail(userData.email);
  if (existingUser) throw new ApiError(409, "User Already Exists!!!");

  const final_result = await userService.createUser(userData);

  res.status(201).json({
    final_result,
    message: "User Created Successfully!!!",
  });
};

const getUsers = async (req, res) => {
  const usersData = await userService.getUsers();
  res.status(200).json({
    usersData,
  });
};

const getProfile = async (req, res) => {
  const userId = req.params.id;
  const userData = await userService.getUserByUserId(userId);
  if (!userData)
    throw new ApiError(404, "User Not Found!! Data Could not be fetched!!!");
  // console.log(userData);

  res.status(200).json({
    userData,
  });
};

const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  const userData = await userService.getUserByUserId(userId);
  if (!userData) throw new ApiError(404, "User Not Found!!!");

  //   const updatedData = {
  //     name: updateData.name,
  //     email: updateData.email,
  //     password: updateData.password,
  //     role: updateData.role,
  //   };

  userData.name = updateData.name;
  userData.email = updateData.email;
  //   userData.password = updateData.password;
  userData.role = updateData.role;

  const newData = await userData.save();
  //   const newData = await userService.findOneAndUpdate(userData,updatedData);
  //   if(!newData) throw new ApiError(304,"Update Does not Happen")
  res.status(200).json({
    newData,
  });
};

const changePassword = async (req, res) => {
  const userId = req.params.id;
  const updatedPassword = req.body.password;
  const userData = await userService.getUserByUserId(userId);
  if (!userData) throw new ApiError(404, "User Not Found!!!");

  userData.password = updatedPassword;

  await userData.save();

  res.status(200).json({
    message: "Password changed Succesfully!!!",
  });
};

module.exports = {
  getProfile,
  updateProfile,
  addUser,
  getUsers,
  changePassword,
};
