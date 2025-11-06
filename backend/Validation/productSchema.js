const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = {
  productSchema,
};
