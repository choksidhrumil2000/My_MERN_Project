const { Product } = require("../models");
const { productService } = require("../services");
const ApiError = require("../utils/ApiError");

const addProduct = async (req, res) => {
  const productData = req.body;
  const existingProduct = await productService.getProductByName(
    productData.name
  );
  console.log(existingProduct);
  if (existingProduct)
    throw new ApiError(409, "Product Already is in Database!!!");

  const final_result = await productService.createProduct(productData);
  res.status(201).json({
    final_result,
    message: "Product Added Successfully!!",
  });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;
  const productData = await productService.getProductByProductId(productId);
  if (!productData) throw new ApiError(404, "Product Not Found!!!");

  productData.name = updateData.name;
  productData.category = updateData.category;
  productData.price = updateData.price;

  const newData = await productData.save();

  res.status(200).json({
    newData,
    message: "Product Updated Successfully",
  });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const productData = await productService.getProductByProductId(productId);

  if (!productData)
    throw new ApiError(404, "Product tobe deleted Not Found In Database!!");

  const deleteProductObj = await productService.deleteProductById(productId);

  if (deleteProductObj.deletedCount === 0)
    throw new ApiError(500, "There is a Problem in Deleting Product!!");

  res.status(200).json({
    message: "Product Deleted Successfully",
  });
};

const getProducts = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const filter = req.query.filter;
  const sort = req.query.sort;
  const search = req.query.search;

  const productsData = await productService.getProducts();

  let final_data = productsData;

  if (search) {
    final_data = final_data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (filter) {
    if (filter !== "all")
      final_data = final_data.filter(
        (item) => item.category.toLowerCase() === filter.toLowerCase()
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

  const startingIndex = currentPage * limit - limit;
  final_data = final_data.slice(startingIndex, currentPage * limit);

  res.status(200).json({
    currentPage,
    startingIndex,
    totalPages,
    final_data,
    limit,
    allProductsData: productsData,
    message: "Data Fetched Successfully!!",
  });
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
