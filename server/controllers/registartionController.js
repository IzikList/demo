const registrationModel = require('../models/schemas/registerSchema.js');
const emailUtils = require('../../server/utils/email.js');




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
                if(newObj.email){
                    sendRegistrationEmail(newObj);
                }
            }
        });
    } 

    function sendRegistrationEmail(obj) {
        if(obj.isInvestor) {
            if(obj.meta && obj.meta.allowEmail ){
                emailUtils.sendEmail1(obj.email);
            }
            if(obj.meta && obj.meta.waitForCall) {
                emailUtils.sendEmail2(obj.email);
            }
        } else  {
            if(obj.meta && obj.meta.allowEmail ){
                emailUtils.sendEmail3(obj.email);
            }
            if(obj.meta && obj.meta.waitForCall) {
                emailUtils.sendEmail4(obj.email);
            }
        }
    }
    return {
        register: register
    };
}

module.exports = regController();

