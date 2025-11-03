const joi = require('joi');

const registerSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().required().email(),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role:joi.string().allow('user','admin')
});

const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

module.exports = {
    registerSchema,
    loginSchema
}