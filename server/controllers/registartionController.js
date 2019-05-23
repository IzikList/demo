const registrationModel = require('../models/schemas/registerSchema.js');


var regController = function () {

    function register(req, res) {
        console.log(req.body);
        const newObj = new registrationModel(req.body);
        newObj.save(function(err, t){
            console.log(err, t);
            if(err){
                res.status(500).send({});
            } else {
                res.status(200).send({});
            }
        });
    } 

    return {
        register: register
    };
}

module.exports = regController();

