var mock = require("./user.mock.json");
// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {

    var mongoose = require("mongoose");

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        userLikesCourse: userLikesCourse
    };
    return api;

    function findUserByCredentials(credentials) {

        // console.log("findUserByCredentials");
        // console.log(credentials);
        // console.log(UserModel.findOne);

        var deferred = q.defer();

        //try {
            // find one retrieves one document
            UserModel.findOne(
                // first argument is predicate
                {
                    username: credentials.username,
                    password: credentials.password
                },
                // doc is unique instance matches predicate
                function(err, doc) {
                    console.log("CALLBACK ****************");
                    console.log([err, doc]);

                    if (err) {
                        // reject promise if error
                        console.log("REJECTING ***************");
                        console.log(err);

                        deferred.reject(err);

                    } else {
                        // resolve promise
                        console.log("RESOLVING ***************");
                        console.log(doc);

                        deferred.resolve(doc);
                    }
                });
            //} catch(e) {
            //    console.log(e);
            //}
        return deferred.promise;
    }

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        UserModel.create(user, function(err, doc) {
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

    // use user model find by id
    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc) {
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
        UserModel.find({
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
        UserModel.findById(userId, function(err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to user likes
                doc.likes.push(course.imdbID);
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
