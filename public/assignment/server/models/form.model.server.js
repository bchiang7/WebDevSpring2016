var mock = require('./form.mock.json');
var mongoose = require("mongoose");
var q = require("q");

module.exports = function(app, db) {

    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,

        createFormForUser: createFormForUser,
        createFieldForForm: createFieldForForm,

        updateFormById: updateFormById,
        updateField: updateField,
        deleteFormById: deleteFormById

    }
    return api;

    function findAllForms() {
        var deferred = q.defer();
        Form
            .find(
                function(err, forms) {
                    if (!err) {
                        deferred.resolve(forms);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();
        Form
            .find({
                _id: {
                    $in: userId
                }
            }, function(err, forms) {
                if (!err) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormById(id) {
        var deferred = q.defer();
        Form
            .findById(userId, function(err, doc) {
                if (!err) {
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        Form
            .findOne({
                    title: title
                },
                function(err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function createForm(form) {
        var deferred = q.defer();
        Form
            .create(form,
                function(err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function createFieldForForm(formId) {
        console.log('create field for form');
    }

    function updateForm(formId, form) {
        var deferred = q.defer();
        Form
            .update({
                    formId: formId
                }, {
                    $set: form
                },
                function(err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        console.log('update field');
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        Form.remove({
                formId: formId
            },
            function(err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }



}
