// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var courseModel   = require("./models/course.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, courseModel, userModel);
    var courseService = require("./services/course.service.server.js")(app, courseModel, userModel);
}
