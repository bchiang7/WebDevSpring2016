module.exports = function() {

    var mongoose = require("mongoose");
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String, // ID of user who created the form
        title: {type: String, default: "New Form"},
        fields: FieldSchema,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    }, {collection: 'Form'});

    return FormSchema;
};
