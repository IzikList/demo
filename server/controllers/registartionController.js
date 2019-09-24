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
                    console.log('send registration email');
                    sendRegistrationEmail(newObj);
                }
            }
        });
    } 

    function sendRegistrationEmail(obj) {
        if(obj.isInvestor) {
            if(obj.meta && obj.meta.waitForCall) {
                emailUtils.sendEmailInvestorCall(obj.email, obj.firstName);
            }else {
                emailUtils.sendEmailInvestorNonCall(obj.email, obj.firstName);
            }
        } else  {
            if(obj.meta && obj.meta.waitForCall) {
                emailUtils.sendEmailPolicyCall(obj.email, obj.firstName);
            } else {
                emailUtils.sendEmailPolicyNonCall(obj.email, obj.firstName);
            }
        }
        sendRegistrationData(obj);
    }

    function sendRegistrationData(obj){
        let txt = "name: " + obj.firstName + "\n" + 
                    "email: " + obj.email + "\n" +
                    "is Investor: " + obj.isInvestor + "\n" +  
                    "phone: " + obj.phoneNumber + "\n" + 
                    "date: " + new Date().toISOString() + '\n' +
                    "user text: " + obj.userText || '';
        if(obj.meta){
            txt +='\n' + 'meta: ' +  JSON.stringify(obj.meta);
        }
        emailUtils.sendAlarmEmail(txt);

    }

    return {
        register: register
    };
}

module.exports = regController();

