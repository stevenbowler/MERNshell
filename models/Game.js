//@ts-check
/**@module
 * @requires mongoose
 */
const mongoose = require('mongoose');

/**@namespace */
//@ts-ignore

const GameSchema = mongoose.Schema({
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
    /**@name score */
    score: {
        type: Number,
        required: true
    },
    /**@name level */
    level: {
        type: Number,
        required: true
    },
    /**@name date */
    date: {
        type: Date,
        default: Date.now
    }
});
// replace 'Games' with your collection name
module.exports = mongoose.model('Clickyones', GameSchema);