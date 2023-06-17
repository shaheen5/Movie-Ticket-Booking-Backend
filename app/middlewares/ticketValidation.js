const joi = require('joi');

const ticketObjectSchema = joi.object({
    ticketId: joi.string()
        .alphanum()
        .min(3)
        .max(8)
        .required(),
    customerName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    customerAge: joi.number()
        .integer()
        .required(),
    movieTitle: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    ticketPrice: joi.number()
        .integer()
        .min(3)
        .required(),
    movieTime: joi.string()
        .alphanum()
        .required(),
    movieLanguage: joi.string()
        .min(3)
        .max(10)
        .required(),
    theatreName: joi.string()
        .min(3)
        .max(20)
        .required()
});
module.exports = ticketObjectSchema;