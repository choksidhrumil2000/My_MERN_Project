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

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const userData = await userService.getUserByUserId(userId);

  if (!userData)
    throw new ApiError(404, "User tobe deleted Not Found In Database!!");

  const deleteUserObj = await userService.deleteUserById(userId);

  if (deleteUserObj.deletedCount === 0)
    throw new ApiError(500, "There is a Problem in Deleting User!!");

  res.status(200).json({
    message: "User Deleted Successfully",
  });
};

const getUsers = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const filter = req.query.filter;
  const sort = req.query.sort;
  const search = req.query.search;

  const usersData = await userService.getUsers();

  let final_data = JSON.parse(JSON.stringify(usersData));
  if (search) {
    final_data = final_data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (filter) {
    if (filter !== "all")
      final_data = final_data.filter(
        (item) => item.role.toLowerCase() === filter.toLowerCase()
      );
  }
  if (sort) {
    if (sort === "asc") {
      final_data = final_data.sort((b, a) => b.createdAt - a.createdAt);
    } else if (sort === "desc") {
      final_data = final_data.sort((b, a) => a.createdAt - b.createdAt);
    }
  }

  const totalPages = Math.ceil(final_data.length / limit);

  // if (currentPage < 1 || (totalPages !== 0 && currentPage > totalPages)) {
  //   // throw new ApiError(
  //   //   404,
  //   //   `Page Limit Exceeded !! There are only ${totalPages} Pages!!`
  //   // );
  //   return;
  // }

  const startingIndex = currentPage * limit - limit;
  final_data = final_data.slice(startingIndex, currentPage * limit);

  res.status(200).json({
    currentPage,
    startingIndex,
    totalPages,
    final_data,
    limit,
    allUsersData: usersData,
    message: "Data Fetched Successfully!!",
  });
};

const getProfile = async (req, res) => {
  const userId = req.params.id;
  const userData = await userService.getUserByUserId(userId);
  if (!userData)
    throw new ApiError(404, "User Not Found!! Data Could not be fetched!!!");

  res.status(200).json({
    userData,
  });
};

const getProfileByEmail = async (req, res) => {
  const email = req.query.email;
  const userData = await userService.getUserbyEmail(email);
  if (!userData)
    throw new ApiError(404, "User Not Found!! Data Could not be fetched!!!");

  res.status(200).json({
    userData,
  });
};

const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  const userData = await userService.getUserByUserId(userId);
  if (!userData) throw new ApiError(404, "User Not Found!!!");

  userData.name = updateData.name;
  userData.email = updateData.email;
  userData.role = updateData.role;

  const newData = await userData.save();
  res.status(200).json({
    newData,
    message: "Updated Successfully",
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
  getProfileByEmail,
  deleteUser,
};
