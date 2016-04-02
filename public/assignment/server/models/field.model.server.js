var mongoose = require("mongoose");
var q = require("q");

module.exports = function(app, db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormField = mongoose.model("FormField", FormSchema);

    var FieldSchema = require("./form.schema.server.js")();
    var Field = mongoose.model("Field", FieldSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findField: findField,
        createField: createField,
        updateField: updateField,
        deleteField: deleteField
    };
    return api;


    function findFieldsByFormId(formId) {
        var deferred = q.defer();

        FormField
            .findById(formId,
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc.fields);
                    }
                }
            );

        return deferred.promise;
    }



    function findField(formId, fieldId) {
        var deferred = q.defer();

        FormField
            .findById(formId,
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        for (f in doc.fields) {
                            if (doc.fields[f]._id === fieldId) {
                                deferred.resolve(doc.fields[f]);
                                return deferred.promise;
                            }
                        }
                        deferred.reject("Could not find field");
                    }
                }
            );
        return deferred.promise;
    }


    function createField(formId, field) {
        var deferred = q.defer();

        FormField
            .findByIdAndUpdate(
                formId,
                {$push: {"fields": field}},
                {new: true},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc)
                    }
                }
            );
        return deferred.promise;
    }

    function updateField(formId, field) {

        console.log(field);

        var deferred = q.defer();

        FormField
            .update(
                {_id: formId, "fields._id" : field._id},
                {$set: {"fields.$": field}},
                {new: true},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        console.log(doc);
                        deferred.resolve(doc)
                    }
                }
            );
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {

        var deferred = q.defer();

        FormField
            .findByIdAndUpdate(formId, {$pull: {fields:{_id: fieldId}}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }



};
