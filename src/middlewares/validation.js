const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
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
    const validationResult = addContactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },

  updateContactValidation: (req, res, next) => {
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
    const validationResult = updateContactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
