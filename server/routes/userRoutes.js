var express = require('express');
const registartionController = require('../controllers/registartionController.js');
// const registrationModel = require('../models/schemas/registerSchema.js');

var routes = function () {
    var userRoutes = express.Router();

    userRoutes.post('/register', registartionController.register);

    return userRoutes;
}

