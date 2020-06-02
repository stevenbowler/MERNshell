const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
    score: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// replace 'Games' with your collection name
module.exports = mongoose.model('Clickyones', GameSchema);