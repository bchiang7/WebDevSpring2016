var express = require('express');
// install and require the mongoose library
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app);
// require("./public/project/server/app.js")(app);
