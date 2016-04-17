var mock = require("./user.mock.json");
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model('User', UserSchema);

    var api = {
        // findAllUsers: findAllUsers,
        // findUserByUsername: findUserByUsername,
        // findUserByCredentials: findUserByCredentials,
        //
        // createUser: createUser,
        // updateUser: updateUser,
        // deleteUser: deleteUser,
        //
        // findUserById: findUserById,
        // findUsersByIds: findUsersByIds,
        // userLikesCourse: userLikesCourse




        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,

        // findUserByGoogleId: findUserByGoogleId,
        // findUserByFacebookId: findUserByFacebookId,

        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,

        userLikesCourse: userLikesCourse
    };
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
            .findById(userId, function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

        // return User.findById(userId);
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        User
            .findOne({
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


    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        // find one retrieves one document
        User.findOne(
            // first argument is predicate
            {
                username: credentials.username,
                password: credentials.password
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
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        User.create(user, function(err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function updateUser(username, user) {
        console.log("model update");
        var deferred = q.defer();
        User
            .update(
                {username: username},
                {$set: user},
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
        console.log("delete clicked");
        var deferred = q.defer();
        User
            .remove(
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


    // use user model find by id
    function findUserById(userId) {
        var deferred = q.defer();
        User.findById(userId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    // function findUserById(userId) {
    //     for (var u in mock) {
    //         if (mock[u]._id === userId) {
    //             return mock[u];
    //         }
    //     }
    //     return null;
    // }

    function findUsersByIds(userIds) {
        var deferred = q.defer();
        // find all users in array of user IDs
        User.find({
            _id: {
                $in: userIds
            }
        }, function(err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    // add course to user likes
    function userLikesCourse(userId, course) {
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to user likes
                doc.likes.push(course.courseID);
                // save user
                doc.save(function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred;
    }


}
