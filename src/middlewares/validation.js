const Joi = require('joi');

const { ValidationError, WrongIdError } = require('../helpers/errors');

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .required(),

  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .optional(),

  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .optional(),
}).min(1);

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }
  next();
};

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(addContactSchema, req, res, next);
  },

  updateContactValidation: (req, res, next) => {
    return validate(updateContactSchema, req, res, next);
  },

  updateContactStatusValidation: (req, res, next) => {
    return validate(updateContactStatusSchema, req, res, next);
  },
};
