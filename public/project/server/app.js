// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var UserModel    = require("./models/user.model.server.js")(db, mongoose);
    var CourseModel   = require("./models/course.model.server.js")(db, mongoose);

    var UserService  = require("./services/user.service.server.js") (app, UserModel);
    var CourseService = require("./services/course.service.server.js")(app, UserModel, CourseModel);
}
