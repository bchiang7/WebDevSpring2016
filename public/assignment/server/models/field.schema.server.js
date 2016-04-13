module.exports = function() {
    var mongoose = require("mongoose");
    // var FormSchema = require("./form.schema.server.js")(mongoose);

    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: "TEXT",
            enum: ["TEXT", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
        },
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    }, {collection: 'assignment.field'});

    return FieldSchema;
};
