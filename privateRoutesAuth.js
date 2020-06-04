//@ts-nocheck
/**@module
 * @requires jwt
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware, checks header "auth-token" against JWT, if token OK proceed to next, else response=400
 * @function
 */
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    // console.log("privateRoutesAuth.js token received from axios: ", token);
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;  // returns verified _ID from JWT.IO so use req.user from then on
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }

}