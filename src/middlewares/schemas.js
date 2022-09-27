const Joi = require('joi');

const REQUIRED = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string-empty': REQUIRED,
  }),
  password: Joi.string().required(),
});

const newUserSchema = Joi.object({
  displayName: Joi.string().required().min(8).messages({
    'string-min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'email-invalid': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string-min': '"password" length must be at least 6 characters long',
  }),
});

const newCategorySchema = Joi.object({
  name: Joi.string().required().messages({
    'name-empty': '"name" is required',
  }),
});

const newPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string-empty': REQUIRED,
  }),
  content: Joi.string().required().messages({
    'string-empty': REQUIRED,
  }),
  categoryIds: Joi.array().min(1).required().messages({
    'array-min': REQUIRED,
  }),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string-empty': REQUIRED,
  }),
  content: Joi.string().required().messages({
    'string-empty': REQUIRED,
  }),
});

module.exports = { 
  loginSchema,
   newUserSchema, 
   newCategorySchema,
   newPostSchema,
   updatePostSchema,
   };