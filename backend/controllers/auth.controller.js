const { authService } = require("../services/index");
const ApiError = require("../utils/ApiError");
const { generateTokenResponse } = require("../utils/TokenHelper");

const register = async (req, res) => {
  const user = req.body;
  // try{
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
  // }catch(err){
  //     res.status(400).json({
  //         message:err.message
  //     })
  // }
};

const login = async (req, res) => {
  const userData = req.body;
  // try{
  // console.log(userData);
  const existingUser = await authService.getUserByEmail(userData.email);
  //   console.log(existingUser);
  if (!existingUser)
    throw new ApiError(401, "User Does not exist!! Register First!!");

  const isPasswordMatch = await existingUser.comparePassword(userData.password);
  if (!isPasswordMatch) throw new ApiError(401, "Invalid Credentials");

  const final_result = generateTokenResponse(existingUser);
  // const result = await authService.loginUser(userData);
  res.status(200).json({
    final_result,
    message: "User LoggedIn Successfully!!",
  });
  // }catch(err){

  // console.log("Error:",err);
  // // res.status(400).json({
  // //     message:err,
  // // })
  // res.send({message:err.message})
  // }
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
