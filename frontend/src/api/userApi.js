import axios from "axios";

export const getAllUsersDataFromChangedParameter = async (
  page,
  limit,
  filter,
  sort,
  search
) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/user/?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
  return res;
};

export const loginToUser = async (userObj) => {
  const res = await axios.post(
    process.env.REACT_APP_API_URL + "/auth/login",
    userObj,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const RegisterUser = async (userObj) => {
  const res = await axios.post(
    process.env.REACT_APP_API_URL + "/auth/register",
    userObj,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const AddUserInDataBase = async (userObj) => {
  const res = await axios.post(
    process.env.REACT_APP_API_URL + "/user/",
    userObj,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const UpdateUserInDatabase = async (userObj, id) => {
  const res = await axios.put(
    process.env.REACT_APP_API_URL + `/user/profile/${id}`,
    userObj,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const getUserByEmail = async (email) => {
  const res = await axios.get(
    process.env.REACT_APP_API_URL + `/user/profile?email=${email}`
  );
  return res;
};

export const updatePasswordInDatabase = async (newPassword, id) => {
  const res = await axios.patch(
    process.env.REACT_APP_API_URL + `/user/profile/${id}`,
    {
      password: newPassword,
    }
  );
  return res;
};

export const deleteUserInDatabase = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
  return res;
};
