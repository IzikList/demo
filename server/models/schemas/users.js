var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var user = new Schema({
    time: {
        type: Date,
        default: Date.now()
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    userText: {
        type: String
    },
    password: {
        type: String
    },
    meta: {
        type: {}
    }
});
module.exports = mongoose.model('user', user);
