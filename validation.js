//@ts-nocheck
/**@module
 * @requires Joi
 */

const Joi = require('@hapi/joi');

/**
 * registration validation with hapi/joi
 * @namespace registerValidation
 * @param {*} data 
 */
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(8).required(),
        email: Joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    });
    return schema.validate(data);
}

/**
 * loginValidation with hapi/joi
 * @namespace loginValidation
 * @param {*} data 
 */
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().min(8).required()

    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
