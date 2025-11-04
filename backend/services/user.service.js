const { User } = require("../models");

const createUser = async (userData) => await User.create(userData);

const getUserByUserId = async (userId) => await User.findOne({ _id: userId });

const getUserbyEmail = async (email) => await User.findOne({ email });

const getUsers = async () => await User.find();

// const findOneAndUpdate = async (oldData, newData) =>
//   await User.findOneAndUpdate({ email: oldData.email }, newData, {
//     new: true,
//     runValidators: true,
//   });

// const addUserData = ()=>{

// }
// const getProfileData = async (userId)=>{
//     const userData =  await User.findOne({_id:userId});
//     if(!userData) throw new ApiError(404,"User Not Found!! Data Could not be fetched!!!");
//     // console.log(userData);
//     return userData;

// }

// const updateProfileData = ()=>{

// }

// module.exports = {
//     addUserData,
//     getProfileData,
//     updateProfileData,
// }
module.exports = {
  getUserByUserId,
  createUser,
  getUserbyEmail,
  getUsers,
  //   findOneAndUpdate,
};
