const authMiddleware = require('./auth.middleware');
const ErrorHandler = require('./erroHandler');
const validateSchemaMiddleware = require('./ValidationMiddleware');

module.exports = {
    authMiddleware,
     ErrorHandler,
     validateSchemaMiddleware
}