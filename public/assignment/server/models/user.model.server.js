var mock = require('./user.mock.json');
var mongoose = require("mongoose");
var q = require("q"); // load q promise library

// pass db and mongoose reference to model
module.exports = function(db) {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("FormUser", UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
    return api;

    function findAllUsers() {
        var deferred = q.defer();
        User
            .find(
                function(err, users) {
                    if (!err) {
                        deferred.resolve(users);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        User
            .findOne({
                    _id: userId
                },
                function(err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        User
            .findOne({
                    username: username
                },
                function(err, developer) {
                    if (!err) {
                        deferred.resolve(developer);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        User
            .findOne({
                    username: username,
                    password: password
                },
                // doc is unique instance matches predicate
                function(err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        User
            .create(user,
                function(err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function updateUser(username, user) {
        var deferred = q.defer();
        User
            .update({
                    username: username
                }, {
                    $set: user
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


    function deleteUser(username) {
        var deferred = q.defer();
        User
            .remove({
                    username: username
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
