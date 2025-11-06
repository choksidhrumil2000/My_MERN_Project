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
