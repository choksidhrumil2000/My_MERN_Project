const express = require("express");
const { authMiddleware, validateSchemaMiddleware } = require("../middleware");
const { productSchema } = require("../Validation/productSchema");
const { productController } = require("../controllers");

const router = express.Router();

router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  validateSchemaMiddleware(productSchema),
  productController.addProduct
);

router.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  validateSchemaMiddleware(productSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  productController.deleteProduct
);

router.get("/", authMiddleware.protect, productController.getProducts);

module.exports = router;
