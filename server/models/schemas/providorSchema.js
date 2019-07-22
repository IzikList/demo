var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var providorSchema = new Schema({
    time: {
        type: Date,
        default: Date.now()
    },
    providorName: {
        type: String
    },
    countries: {
        type: []
    },
    meta: {
        type: {}
    }
});
module.exports = mongoose.model('providor', providorSchema);
