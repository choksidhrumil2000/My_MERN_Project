const express = require("express");
const { userController } = require("../controllers");
const { authMiddleware, validateSchemaMiddleware } = require("../middleware");
const {
  userSchema,
  passwordSchema,
  userProfileSchema,
  emailSchema,
} = require("../Validation/userSchema");
const router = express.Router();

router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  validateSchemaMiddleware(userSchema),
  userController.addUser
);

router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  userController.getUsers
);

router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.authorizeRole("admin"),
  userController.deleteUser
);

router.get("/profile", userController.getProfileByEmail);
router.get("/profile/:id", authMiddleware.protect, userController.getProfile);

router.put(
  "/profile/:id",
  authMiddleware.protect,
  validateSchemaMiddleware(userProfileSchema),
  userController.updateProfile
);

router.patch(
  "/profile/:id",
  // authMiddleware.protect,
  validateSchemaMiddleware(passwordSchema),
  userController.changePassword
);

module.exports = router;
