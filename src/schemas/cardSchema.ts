import Joi from "joi";

export const cardSchema = Joi.object({
    employeeId: Joi.number().integer().required(),
    number: Joi.string().required().pattern(/^[0-9]{16}$/).message(`card number must be a string having 16 digits`),
    securityCode: Joi.string().required().pattern(/^[0-9]{3}$/).message(`security code must be a string with 3 digits`),
    expirationDate: Joi.string().required().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).message(`expiration date must follow the pattern MM/YY`),
    password: Joi.string().trim().required(),
    isVirtual: Joi.string().valid('true', 'false').required(),
    originalCardId: Joi.string().required(),
    isBlocked: Joi.string().valid('true', 'false').required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})