//@ts-check
/**@module
 * @requires mongoose
 */
const mongoose = require('mongoose');

/**@namespace
 * @property {String} name
 */
//@ts-ignore
const UserSchema = mongoose.Schema({
    /**@name name*/
    name: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    /**@name email*/
    email: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
    /**@name password*/
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    /**@name date*/
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);