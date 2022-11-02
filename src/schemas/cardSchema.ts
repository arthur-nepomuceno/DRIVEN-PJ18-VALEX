import Joi from "joi";

export const cardSchema = Joi.object({
    empolyeeId: Joi.number().integer().required(),
    number: Joi.number().integer().required(),
    cardholderName: Joi.string().required(),
    securityCode: Joi.string().required(),
    expirationDate: Joi.string().required().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
    password: Joi.string(),
    isVirtual: Joi.string().required(),
    originalCardId: Joi.string(),
    isBlocked: Joi.string().required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})