const express = require('express');
const { authController } = require('../controllers');
const { validateSchemaMiddleware } = require('../middleware');
const { registerSchema, loginSchema } = require('../Validation/authSchema');
const router = express.Router();

router.post('/register',validateSchemaMiddleware(registerSchema),authController.register);
router.post('/login',validateSchemaMiddleware(loginSchema),authController.login);
// router.get('/logout',authController.logout);

module.exports = router;