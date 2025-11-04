const { User } = require("../models/index");

const getUserByEmail = async (email) => await User.findOne({ email });

// const registerUser = async ({ name, email, password }) => {
const createUser = async ({ name, email, password, role }) => {
  // const existingUser = await User.findOne({ email });
  // if (existingUser) throw new ApiError("User Already Registered!!");
  // const user = await User.create({ name, email, password });
  // return generateTokenResponse(user);

  // const existingUser = await User.findOne({ email });
  // if (existingUser) throw new ApiError(409,"User Already Registered!!");
  const user = await User.create({ name, email, password, role });
  // return generateTokenResponse(user);
  return user;
};

// const loginUser = async ({ email, password }) => {
//   // const existingUser = await User.findOne({ email });
//   // console.log(existingUser);
//   // if (!existingUser) throw new ApiError(401,"User Does not exist!! Register First!!");

//   // const isPasswordMatch = await existingUser.comparePassword(password);
//   // if (!isPasswordMatch) throw new ApiError(401,"Invalid Credentials");

//   // return generateTokenResponse(existingUser);
// };

// const generateTokenResponse = (user) => {
//   const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
//     expiresIn: process.env.jwt_expiresIn,
//   });

//   return {
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     },
//   };
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };
module.exports = {
  createUser,
  getUserByEmail,
  // loginUser,
};
