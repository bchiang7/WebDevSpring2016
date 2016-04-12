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

        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,

        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
    return api;

    function findAllUsers() {
        // console.log("model find all users");
        // var deferred = q.defer();
        // User
        //     .find(
        //         function(err, users) {
        //             if (!err) {
        //                 deferred.resolve(users);
        //             } else {
        //                 deferred.reject(err);
        //             }
        //         }
        //     );
        // return deferred.promise;
        return User.find();
    }

    function findUserById(userId) {
        // var deferred = q.defer();
        // UserModel
        //     .findById(userId, function(err, doc) {
        //         if (err) {
        //             deferred.reject(err);
        //         } else {
        //             deferred.resolve(doc);
        //         }
        //     });
        // return deferred.promise;

        return User.findById(userId);
    }

    function findUserByUsername(username) {
        // var deferred = q.defer();
        // User
        //     .findOne({
        //             username: username
        //         },
        //         function(err, user) {
        //             if (!err) {
        //                 deferred.resolve(user);
        //             } else {
        //                 deferred.reject(err);
        //             }
        //         }
        //     );
        // return deferred.promise;
        return User.findOne({
            username: username
        });
    }

    // function findUserByCredentials(username, password) {
    //     var deferred = q.defer();
    //     User
    //         .findOne({
    //                 username: username,
    //                 password: password
    //             },
    //             // doc is unique instance matches predicate
    //             function(err, doc) {
    //                 if (!err) {
    //                     deferred.resolve(doc);
    //                 } else {
    //                     deferred.reject(err);
    //                 }
    //             });
    //     return deferred.promise;
    // }

    function findUserByCredentials(credentials) {
        return User.findOne({
            username: credentials.username,
            password: credentials.password
        });
    }

    function findUserByGoogleId(googleId) {
        return User.findOne({
            'google.id': googleId
        });
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({
            'facebook.id': facebookId
        });
    }



    function createUser(user) {
        // var deferred = q.defer();
        // User
        //     .create(user,
        //         function(err, doc) {
        //             if (!err) {
        //                 deferred.resolve(doc);
        //             } else {
        //                 deferred.reject(err);
        //             }
        //         });
        // return deferred.promise;
        return User.create(user);
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
}
