import Joi from "joi";

export const cardSchema = Joi.object({
    employeeId: Joi.number().integer().required(),
    isVirtual: Joi.boolean().required(),
    isBlocked: Joi.boolean().valid(true).required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})

export const activateSchema = Joi.object({
    securityCode: Joi.number().min(100).max(999).required(),
    password: Joi.number().min(1000).max(9999).required()
})

export const viewCardSchema = Joi.object({
    id: Joi.number().required()
})