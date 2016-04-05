var express         = require('express');
var app             = express();
var session         = require('express-session');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var cookieParser    = require('cookie-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/cs4550';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port        = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var secret = process.env.SESSION_SECRET || '1234567890QWERTY';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));


// initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);
