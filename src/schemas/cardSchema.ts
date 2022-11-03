import Joi from "joi";

export const cardSchema = Joi.object({
    employeeId: Joi.number().integer().required(),
    password: Joi.string().trim().required(),
    isVirtual: Joi.string().valid('true', 'false').required(),
    originalCardId: Joi.string().required(),
    isBlocked: Joi.string().valid('true', 'false').required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})