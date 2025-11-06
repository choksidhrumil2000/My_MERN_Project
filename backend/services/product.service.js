const { Product } = require("../models");

const createProduct = async (data) => await Product.create(data);

const getProductByName = async (name) => await Product.findOne({ name });

const getProductByProductId = async (productId) =>
  await Product.findOne({ _id: productId });

const deleteProductById = async (productId) =>
  await Product.deleteOne({ _id: productId });

const getProducts = async () => await Product.find();

module.exports = {
  createProduct,
  getProductByName,
  getProductByProductId,
  deleteProductById,
  getProducts,
};
