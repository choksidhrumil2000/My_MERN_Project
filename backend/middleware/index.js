const authMiddleware = require('./auth.middleware');
const errorHandler = require('./erroHandler');
const validateSchemaMiddleware = require('./ValidationMiddleware');

module.exports = {
    authMiddleware,
     errorHandler,
     validateSchemaMiddleware
}