var mock = require("./user.mock.json");
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model('User', UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,

        // findUserByGoogleId: findUserByGoogleId,
        // findUserByFacebookId: findUserByFacebookId,

        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,

        favoriteCourse: favoriteCourse
    };
    return api;


    function findAllUsers() {
        // console.log("model findAllUsers");
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
        // console.log("model createUser");
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

    // function updateUser(username, user) {
    //     var deferred = q.defer();
    //     User
    //         .update({
    //                 username: username
    //             }, {
    //                 $set: user
    //             },
    //             function(err, stats) {
    //                 if (!err) {
    //                     deferred.resolve(stats);
    //                 } else {
    //                     deferred.reject(err);
    //                 }
    //             }
    //         );
    //     return deferred.promise;
    // }

    function updateUser(userId, user) {
        // console.log("model update");
        return User.update({
            _id: userId
        }, {
            $set: user
        });
    }

    // function deleteUser(username) {
    //     var deferred = q.defer();
    //     User
    //         .remove({
    //                 username: username
    //             },
    //             function(err, stats) {
    //                 if (!err) {
    //                     deferred.resolve(stats);
    //                 } else {
    //                     deferred.reject(err);
    //                 }
    //             }
    //         );
    //     return deferred.promise;
    // }

    function deleteUser(userId) {
        // console.log("model delete ", userId);
        return User.remove({
            _id: userId
        });
    }

    // add course to user likes
    function favoriteCourse(userId, course) {
        // console.log("user model fav");
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to list of courses user has favorited
                doc.likes.push(course._id);
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
