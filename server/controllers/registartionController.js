const registrationModel = require('../models/schemas/registerSchema.js');
const UserModel = require('../models/schemas/users');


var regController = function () {

    function register(req, res) {
        console.log(req.body);
        const newObj = new registrationModel(req.body);
        newObj.save(function (err, t) {
            console.log(err, t);
            if (err) {
                res.status(500).send({});
            } else {
                res.status(200).send({});
            }
        });
    }

    function generateCode(req, res) {
        console.log(req.body);
        const user = new UserModel(req.body);
        user.password = makeid(6);
        UserModel.update({ email: req.email}, user, {upsert: true}, function(err, raw) {
            console.log(err, raw);
            
        });
    }
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return {
        register: register
    };
}

module.exports = regController();

