module.exports = function() {

    var mongoose = require("mongoose");
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,   // alice
        password: String,   // p@ssw0rd
        firstName: String,  // Alice
        lastName: String,   // Wonderland
        emails: [String],   // ['alice@wonderland.com', 'alice@gmail.com']
        roles: [String],
        phones: [String]    // ['123-234-4321', '234-432-2344']
    }, {collection: 'assignment.user'});

    return UserSchema;
};
