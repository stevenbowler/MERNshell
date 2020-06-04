//@ts-nocheck
/**@module
 * @requires jst
 */

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    console.log("privateRoutesAuth.js token received from axios: ", token);
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;  // returns verified _ID from JWT.IO so use req.user from then on
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }

}