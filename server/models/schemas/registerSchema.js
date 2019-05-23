var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var regModule = new Schema({
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
        type: String
    },
    userText: {
        type: String
    },
    meta: {
        type: {}
    }
});
module.exports = mongoose.model('registartion', regModule);
