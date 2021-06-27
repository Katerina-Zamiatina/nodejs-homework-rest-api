const Joi = require('joi');

const { ValidationError, WrongIdError } = require('../helpers/errors');

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .required(),

  password: Joi.string().required(),
});

const validate = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }
  next();
};

module.exports = {
  userValidation: (req, res, next) => {
    return validate(userSchema, req, res, next);
  },
};
