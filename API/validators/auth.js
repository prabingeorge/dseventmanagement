import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(10).required(),
  password: Joi.string().min(6).required(),
  status: Joi.string().required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
