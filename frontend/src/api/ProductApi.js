import axios from "axios";

export const getAllProductsDataFromChangedParameter = async (
  page,
  limit,
  filter,
  sort,
  search
) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
  return res;
};

export const addProductInDatabase = async (productObj) => {
  const res = await axios.post(
    process.env.REACT_APP_API_URL + "/product/",
    productObj,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const updateProductInDatabase = async (productObj, id) => {
  const res = await axios.put(
    process.env.REACT_APP_API_URL + `/product/${id}`,
    productObj,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const deleteProductInDatabase = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
  return res;
};
