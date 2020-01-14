const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(8).required(),
        email: Joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    });
    return schema.validate(data);
}

// loginValidation 
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().min(8).required()

    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
