const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  role: Joi.string().allow("user", "admin").default("user"),
});

const userProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  role: Joi.string().allow("user", "admin").default("user"),
});

const passwordSchema = Joi.object({
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

// const emailSchema = Joi.object({
// email: Joi.string().required().email(),
// });

module.exports = {
  userSchema,
  passwordSchema,
  userProfileSchema,
  // emailSchema,
};
