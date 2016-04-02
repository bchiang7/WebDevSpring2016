module.exports = function (app, db, mongoose) {
    var UserModel   = require("./models/user.model.server.js")(db, mongoose);
    var FormModel   = require("./models/form.model.server.js")(db, mongoose);
    var FieldModel  = require("./models/field.model.server.js")(db, mongoose);

    var UserService     = require("./services/user.service.server.js")(app, UserModel);
    var FormService     = require("./services/form.service.server.js")(app, UserModel, FormModel);
    var FieldService    = require("./services/field.service.server.js")(app, FormModel, FieldModel);
};
