var Providor = require('../models/schemas/providorSchema.js');



var providorController = function () {

    function addAll(req, res) {
        if(! req.body) {
            return res.status(400).send({});
        }
        var provs = {};
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                var element = req.body[key];
                for(let i = 0; i < element.providors.length; i++){
                    const providor = element.providors[i];
                    if(! provs[providor]){
                        provs[providor] = {providorName: providor, countries: []};
                    }
                    provs[providor].countries.push(element);
                }

            }
        }
        var array = [];
        for (var key in provs) {
            if (provs.hasOwnProperty(key)) {
                array.push(provs[key]);                
            }
        }

        console.log(array);

        res.status(200).send();
    }

    return {
        addAll: addAll
    };
}

module.exports = providorController();

