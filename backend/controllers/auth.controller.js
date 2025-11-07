const { authService } = require("../services/index");
const ApiError = require("../utils/ApiError");
const { generateTokenResponse } = require("../utils/TokenHelper");

const register = async (req, res) => {
  const user = req.body;
  const existingUser = await authService.getUserByEmail(user.email);
  if (existingUser) throw new ApiError(409, "User Already Registered!!");
  console.log("User", user);
  const userData = await authService.createUser(user);

  console.log("After Creating user:", userData);
  const final_result = generateTokenResponse(userData);

  console.log("final_resuklt", final_result);
  res.status(200).json({
    final_result,
    message: "User Registered Successfully!!!",
  });
};

const login = async (req, res) => {
  const userData = req.body;
   const existingUser = await authService.getUserByEmail(userData.email);
  if (!existingUser)
    throw new ApiError(401, "User Does not exist!! Register First!!");

  const isPasswordMatch = await existingUser.comparePassword(userData.password);
  if (!isPasswordMatch) throw new ApiError(401, "Invalid Credentials");

  const final_result = generateTokenResponse(existingUser);
  res.status(200).json({
    final_result,
    message: "User LoggedIn Successfully!!",
  });
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
