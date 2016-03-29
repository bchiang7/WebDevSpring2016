module.exports = function() {

    var mongoose = require("mongoose");
    // var FormSchema = require("./form.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,  // First Name
        type: {type: String, default: "TEXT"},
        // ENUM VALUES: TEXT, EMAIL, PASSWORD, OPTIONS, DATE, RADIOS, CHECKBOXES
        placeholder: String,    // Alice
        options: [{label:STRING, value:STRING}] // [{label:'Male', value:'MALE'}, {label:'Female', value:'FEMALE'}]
    }, {collection: 'field'});

    return FieldSchema;
};
