const Joi = require("joi");

const problemValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    difficulty: Joi.string().valid("easy", "medium", "hard").required(),
    tags: Joi.array().items(Joi.string().valid("array", "linkedList", "graph", "dp")),

    visibleTestCases: Joi.object({
      input: Joi.string().required(),
      output: Joi.string().required(),
      explanation: Joi.string().required(),
    }).required(),

    hiddenTestCases: Joi.object({
      input: Joi.string().required(),
      output: Joi.string().required(),
    }).required(),

    startCode: Joi.object({
      language: Joi.string().required(),
      initialCode: Joi.string().required(),
    }).required(),

    referenceSolution: Joi.object({
      language: Joi.string().required(),
      referenceCode: Joi.string().required(),
    }).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = problemValidator;
