var mongoose = require("mongoose");
var q = require("q");

module.exports = function(app, db) {

    var FieldSchema = require("./form.schema.server.js")();
    var Field = mongoose.model("Field", FieldSchema);

    var api = {
        findFieldsForForm: findFieldsForForm,
        findFieldForForm: findFieldForForm,
        createFieldForForm: createFieldForForm,
        updateFieldById: updateFieldById,
        deleteFieldFromForm: deleteFieldFromForm
    }
    return api;


    function findFieldsForForm(formId) {

    }

    function findFieldForForm(formId, fieldId) {

    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();
        // find form by formId here
        Field
            .create(field,
                function(err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function updateFieldById(formId, fieldId, field) {
        var deferred = q.defer();
        // do something with formId here
        Field
            .update({
                    fieldId: fieldId
                }, {
                    $set: field
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

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        // find form by Id
        Field
            .remove({
                    field: field
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
