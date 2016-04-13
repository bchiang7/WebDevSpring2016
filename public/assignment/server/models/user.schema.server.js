module.exports = function() {

    var mongoose = require("mongoose");
    var FormSchema = require("./form.schema.server.js")(mongoose);

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        roles: [String],
        phones: [String]
    }, {collection: 'assignment.user'});

    return UserSchema;
};
