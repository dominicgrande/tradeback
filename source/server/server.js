// Get the packages we need
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const config = require('./config');
const User = require('./routes/')
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Use environment defined port or 3000
var port = config.port;

// Connect to a MongoDB
mongoose.connect(config.mongo_connection, { useMongoClient: true});

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://tradeback.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* Passport code */

require('./models').connect(config.mongo_connection);
require('./auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Use routes as a module (see index.js)
require('./routes/index')(app, router, passport);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
