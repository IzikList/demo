var express = require('express');
const registartionController = require('../controllers/providors.js');
// const registrationModel = require('../models/schemas/registerSchema.js');

var routes = function () {
    var userRoutes = express.Router();

    userRoutes.post('/addAll', registartionController.addAll);

    return userRoutes;
}

module.exports = routes();