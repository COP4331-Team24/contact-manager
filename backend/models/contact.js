const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    number: {
        type: String
    },
    user_id: {
        type: Number
    }
});

module.exports = mongoose.model('Contact', Contact);