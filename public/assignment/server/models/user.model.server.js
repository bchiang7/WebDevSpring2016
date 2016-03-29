var mock = require('./user.mock.json');
var mongoose = require("mongoose");
var q = require("q");

module.exports = function(app, db) {

    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById
    }
    return api;

    function findAllUsers() {
        var deferred = q.defer();
        User.find(
            function(err, users) {
                if(!err) {
                    deferred.resolve(users);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        User.findOne({
                id: _id
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
        User.findOne({
                username: username
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

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        // find one retrieves one document
        User.findOne(
            // first argument is predicate
            {
                username: username,
                password: password
            },
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        User.create(user, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(username, user) {
        var deferred = q.defer();
        User.update (
                {username: username},
                {$set: user},
                function(err, stats) {
                    if !err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function deleteUserById(username) {
        var deferred = q.defer();
        User.remove(
                {username: username},
                function (err, stats) {
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
