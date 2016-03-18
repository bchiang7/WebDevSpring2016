module.exports = function (app) {
    var UserModel = require("./models/user.model.js")();
    var FormModel = require("./models/form.model.js")();

    var MovieService = require("./services/user.service.server.js")(app, UserModel);
    var FormService = require("./services/form.service.server.js")(app, FormModel);
    var FieldService = require("./services/field.service.server.js")(app, FormModel);
};
