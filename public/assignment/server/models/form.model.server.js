var mock = require('./form.mock.json');
var mongoose = require("mongoose");
var q = require("q");

module.exports = function(app, db) {

    var api = {
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,

        createForm: createForm,
        createFieldForForm: createFieldForForm,

        updateForm: updateForm,
        updateField: updateField,
        deleteFormById: deleteFormById
    }
    return api;

    function findAllForms() {
        return mock;
    }

    function findFormsByUserId(userId) {
        var userForms = [];
        for (var i in mock) {
            if (mock[i].userId == userId) {
                userForms.push(mock[i]);
            }
        }
        return userForms;
    }

    function findFormById(id) {
        for (var i in mock) {
            if (mock[i]._id === id) {
                return mock[i];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for(var i in mock) {
            if (mock[i].title == title) {
                return mock[i];
            }
        }
        return null;
    }

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function createFieldForForm(formId) {
        field._id = "ID_" + (new Date()).getTime();
        for(var i in mock) {
            if(mock[i]._id == formId){
                mock[i].fields.push(field);
                return mock[i];
            }
        }
        return null;
    }

    function updateForm(formId, form) {
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock[i].title = form.title;
                mock[i].userId = form.userId;
                mock[i].fields = form.fields;
                return mock[i];
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                for (var f in mock[u].fields) {
                    if (mock[u].fields[f]._id == fieldId) {
                        if (field.label)
                            mock[u].fields[f].label = field.label;

                        if (field.type)
                            mock[u].fields[f].type = field.type;

                        if (field.placeholder)
                            mock[u].fields[f].placeholder = field.placeholder;

                        if (field.options) {
                            var updateOptions = [];
                            var options = field.options.split("\n");
                            for (var o in options) {
                                var label_value_pairs = options[o].split(";");
                                updateOptions.push({
                                    "label": label_value_pairs[0],
                                    "value": label_value_pairs[1]
                                });
                            }
                            mock[u].fields[f].options = updateOptions;
                        }

                        return mock[u].fields[f];
                    }
                }
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i, 1);
            }
        }
        return mock;
    }



}
