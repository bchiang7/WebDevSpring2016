var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, UserModel) {

    var auth = authorized;
    //app.get("/api/assignment/user", findAllUsers);
    //app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    // app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/:username", findUserByUsername);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);

    app.post("/api/assignment/user", auth, createUser);
    app.put('/api/assignment/user/:id', auth, updateUser);
    app.delete('/api/assignment/user/:id', auth, deleteUser);

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/client/#/profile',
            failureRedirect: '/assignment/client/#/login'
        }));

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/client/#/profile',
            failureRedirect: '/assignment/client/#/login'
        }));

    var googleConfig = {
        //clientID: process.env.GOOGLE_CLIENT_ID,
        clientID: '227254899722-ht7f9m92f38jqn70f3s8iabt6j9a6r09.apps.googleusercontent.com',
        //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        clientSecret: 'eskoTag--IYFwul4Ur2ciGFO',
        //callbackURL: process.env.GOOGLE_CALLBACK_URL
        callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
    };

    var facebookConfig = {
        //clientID: process.env.FACEBOOK_CLIENT_ID,
        clientID: '1107922419260153',
        //clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        clientSecret: '26eaf3a93ff69af74046e2797ecbcb00',
        //callbackURL: process.env.FACEBOOK_CALLBACK_URL
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials({
                username: username,
                password: password
            })
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return UserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function(user) {
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return UserModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function(user) {
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }



    /////////////////// from passport example //////////////////

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return UserModel.createUser(newUser);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if (user) {
                        req.login(user, function(err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function isAdmin(user) {
        // if (user.roles.indexOf("admin") > 0) {
        if (user.roles.indexOf('admin') != -1) {
            return true;
        }
        return false;
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


    //////////////////////////////////////////////////////////////////////////////////////////

    // function findUser(req, res) {
    //     var username = req.query.username;
    //     var password = req.query.password;
    //
    //     if (username && password) {
    //         UserModel
    //             .findUserByCredentials(username, password)
    //             .then(
    //                 function(user) {
    //                     req.session.currentUser = user;
    //                     res.json(user);
    //                 },
    //                 function(err) {
    //                     res.status(400).send(err);
    //                 }
    //             );
    //     } else {
    //         UserModel
    //             .findAllUsers()
    //             .then(
    //                 function(users) {
    //                     res.json(users);
    //                 },
    //                 function(err) {
    //                     res.status(400).send(err);
    //                 }
    //             );
    //     }
    // }

    function findAllUsers(req, res) {
        if (isAdmin(req.user)) {
            console.log("server find all users");
            UserModel
                .findAllUsers()
                .then(
                    function(users) {
                        res.json(users);
                    },
                    function() {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findUserById(req, res) {
        UserModel
            .findUserById(req.params._id)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        UserModel
            .findUserByUsername(req.params.username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    // function findUserByCredentials(req, res) {
    //     var username = req.query.username;
    //     var password = req.query.password;
    //     UserModel
    //         .findUserByCredentials(username, password)
    //         .then(
    //             function(user) {
    //                 res.json(user);
    //             },
    //             function(err) {
    //                 res.status(400).send(err);
    //             }
    //         );
    // }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return UserModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function() {
                                    return UserModel.findAllUsers();
                                },
                                function(err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return UserModel.findAllUsers();
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {
                    res.json(users);
                },
                function() {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        UserModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user) {
                    return UserModel.findAllUsers();
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        if (isAdmin(req.user)) {
            // console.log("server delete ", req.params.id);
            UserModel
                .deleteUser(req.params.id)
                .then(
                    function(user) {
                        return UserModel.findAllUsers();
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users) {
                        res.json(users);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }



}
