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
        updateFormById: updateFormById,
        deleteFormById: deleteFormById

    };
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

    function findAllFormsForUser(userId) {

        //console.log("model userId = " + userId);

        var deferred = q.defer();
        Form
            .find({
                    userId: userId
                },
                function(err, forms) {
                    if (!err) {
                        deferred.resolve(forms);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function findFormById(formId) {
        //console.log("inside select model");

        var deferred = q.defer();
        Form
            .findById(formId,
                function(err, form) {
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

    function createFormForUser(userId, form) {
        //console.log("model userId = " + userId);
        var deferred = q.defer();
        Form
            .create({
                    title: form.title,
                    userId: userId
                },
                function(err, form) {
                    if (!err) {
                        deferred.resolve(form);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }



    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        // Form
        //     .update({
        //             _id: formId
        //         }, {
        //             $set: newForm
        //         },
        //         function(err, stats) {
        //             if (!err) {
        //                 deferred.resolve(stats);
        //             } else {
        //                 deferred.reject(err);
        //             }
        //         }
        //     );


        var newForm = {
            userId: newForm.userId,
            title: newForm.title,
            fields: newForm.fields,
            created: newForm.created,
            updated: (new Date).getTime()
        }

        newForm.updated = (new Date).getTime();

        Form
            .findByIdAndUpdate(formId, {
                    $set: newForm
                }, {
                    new: true,
                    upsert: true
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



    function deleteFormById(formId) {
        //console.log("model deleteFormById " + formId);

        var deferred = q.defer();
        Form
            .remove({
                    _id: formId
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



};
