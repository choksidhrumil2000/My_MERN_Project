const express = require("express");
const { userController } = require("../controllers");
const { authMiddleware, validateSchemaMiddleware } = require("../middleware");
const { userSchema, passwordSchema } = require("../Validation/userSchema");
const router = express.Router();

router.post(
  "/profile/",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  validateSchemaMiddleware(userSchema),
  userController.addUser
);

router.get(
  "/profile/",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  userController.getUsers
);

router.get("/profile/:id", authMiddleware.protect, userController.getProfile);

router.put(
  "/profile/:id",
  authMiddleware.protect,
  validateSchemaMiddleware(userSchema),
  userController.updateProfile
);

router.patch(
  "/profile/:id",
  authMiddleware.protect,
  validateSchemaMiddleware(passwordSchema),
  userController.changePassword
);

module.exports = router;
