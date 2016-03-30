module.exports = function() {

    var mongoose = require("mongoose");
    // var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String, // ID of user who created the form
        title: {type: String, default: "New Form"},
        fields: [Field Schema], // Array of embedded field instance objects that adhere to the field schema described earlier
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    }, {collection: 'Form'});

    return FormSchema;
};
