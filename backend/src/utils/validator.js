const Joi = require("joi");

const validator = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).optional(),
    emailId: Joi.string().email().required(),
    age: Joi.number().min(15).max(80).required(),
    role: Joi.string().valid("user", "admin").default("user"),
    problemSolved: Joi.number().min(0).default(0),
    password: Joi.string().min(6).required()  // ✅ added
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = validator;
