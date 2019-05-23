//Install express server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var db = process.env.MONGO_URI || 'mongodb://List:ListDemo1@ds013004.mlab.com:13004/heroku_fk56fnpl';
mongoose.connect(db);

const app = express();
app.use('/api', bodyParser.json({ limit: '5mb' }));

// var mainRouter = require("./routes/mainRoutes");

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/list'));

app.use('/api', function(req, res, next) { //__setxhr_
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, __setxhr_');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        try {
            next();
        } catch (er) {
            Logger.error(req, er);
            try {
                req.status(500).send()
            } catch (err) {
                Logger.error(req, err);
            }
        }
    }
});

var userRoutes  = require('./server/routes/userRoutes.js');
app.post('/api/register', function(req, res){
    var controloer = require('./server/controllers/registartionController.js');
    controloer.register(req, res);
})

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/list/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

