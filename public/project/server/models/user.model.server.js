var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model('User', UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,

        // findUserByGoogleId: findUserByGoogleId,
        // findUserByFacebookId: findUserByFacebookId,

        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,

        // FAVORITED COURSES
        favoriteCourse: favoriteCourse,
        unfavoriteCourse: unfavoriteCourse,

        // COMPLETED COURSES
        completeCourse: completeCourse,
        uncompleteCourse: uncompleteCourse,

        // IN PROGRESS COURSES
        progressCourse: progressCourse,
        unprogressCourse: unprogressCourse
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

    function findUsersByIds(userIds) {
        var deferred = q.defer();

        // console.log("model findUsersByIds", userIds);

        // find all users in array of user IDs
        User.find({
            _id: {$in: userIds}
        }, function(err, users) {
            if (!err) {
                deferred.resolve(users);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
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

    function updateUser(userId, user) {
        // console.log("model update");
        return User.update({
            _id: userId
        }, {
            $set: user
        });
    }

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

    // remove course from user likes
    function unfavoriteCourse(userId, course) {
        // console.log("user model fav");
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to list of courses user has favorited
                doc.likes.splice(course._id);
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


    // add course to user completed courses
    function completeCourse(userId, course) {
        // console.log("user model fav");
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to list of courses user has completed
                doc.completed.push(course._id);
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

    // remove course from user completed courses
    function uncompleteCourse(userId, course) {
        // console.log("user model fav");
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to list of courses user has favorited
                doc.completed.splice(course._id);
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





    // add course to user inprogress
    function progressCourse(userId, course) {
        // console.log("user model fav");
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to list of courses user has completed
                doc.inprogress.push(course._id);
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

    // remove course from user inprogress
    function unprogressCourse(userId, course) {
        // console.log("user model fav");
        var deferred = q.defer();
        // find the user
        User.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to list of courses user has favorited
                doc.inprogress.splice(course._id);
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
