var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, UserModel) {

    var auth = authorized;

    //app.get("/api/assignment/user", findAllUsers);
    //app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);    ///////////////////

    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/:username", findUserByUsername);

    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:username", updateUser);
    app.delete("/api/assignment/user/:username", deleteUser);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout); ////////////////////
    app.post('/api/assignment/register', register);


    // app.post('api/assignment/admin/user', adminCreateUser);
    // app.get('api/assignment/admin/user', adminFindAllUsers);
    // app.get('api/assignment/admin/user/:userId', adminFindUserById);
    // app.delete('api/assignment/admin/user/:userId', adminDeleteUser);
    // app.put('api/assignment/admin/user/:userId', adminUpdateUser);



    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));


    //console.log(process.env.GOOGLE_CLIENT_ID);
    //console.log(process.env.GOOGLE_CLIENT_SECRET);
    //console.log(process.env.GOOGLE_CALLBACK_URL);

    var googleConfig = {
        //clientID: process.env.GOOGLE_CLIENT_ID,
        clientID: '901675813511-ogn94ata12drve9vf9iuueesauanaspn.apps.googleusercontent.com',
        //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        clientSecret: 'rPgOZoP7uf7_o4vJgZ0yRSWL',
        //callbackURL: process.env.GOOGLE_CALLBACK_URL
        callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
    };

    //var facebookConfig = {
    //    clientID: process.env.FACEBOOK_CLIENT_ID,
    //    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //    callbackURL: process.env.FACEBOOK_CALLBACK_URL
    //};

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    //passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

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
                        return userModel.createUser(newGoogleUser);
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
                        return userModel.createUser(newFacebookUser);
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
        userModel
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


    function isAdmin(user) {
        if (user.roles.indexOf("admin") > 0) {
            return true
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

    ////////////////////////////////////////////////////////////////////////////////////

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




    //////////////////////////////////////////////////////////////////////////////////////////


    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            UserModel
                .findUserByCredentials(username, password)
                .then(
                    function(user) {
                        req.session.currentUser = user;
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            UserModel
                .findAllUsers()
                .then(
                    function(users) {
                        res.json(users);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findAllUsers(req, res) {
        UserModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
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
        var user = req.body;
        UserModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        // console.log("update");
        var username = req.params.username;
        var user = req.body;
        UserModel
            .updateUser(username, user)
            .then(
                function(response) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var username = req.params.username;
        UserModel
            .deleteUser(username)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }



}
