var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, UserModel, CourseModel) {

    var auth = authorized;

    // app.get("/api/project/user", findAllUsers);
    // app.get("/api/project/user/:username", findUserByUsername);
    // // app.get("/api/project/user?username=/" + username + "&password=" + password, findUserByCredentials);

    app.post('/api/project/login', passport.authenticate('project'), login);
    // app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);

    app.get("/api/project/user", auth, findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user/:username", findUserByUsername);

    app.post("/api/project/user", auth, createUser);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUser);

    app.get("/api/project/user/:userId/favorites", findUserFavorites);
    app.get("/api/project/user/:userId/completed", findUserCompleted);
    app.get("/api/project/user/:userId/inprogress", findUserInProgress);


    // passport.use(new LocalStrategy(localStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function projectLocalStrategy(username, password, done) {
        UserModel.findUserByCredentials({
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel.findUserById(user._id)
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
    }


    function login(req, res) {
        // var credentials = req.body;
        // UserModel.findUserByCredentials(credentials)
        //     .then(
        //         function(doc) {
        //             req.session.currentUser = doc;
        //             res.json(doc);
        //         },
        //         // send error if promise rejected
        //         function(err) {
        //             res.status(400).send(err);
        //         }
        //     )
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        // store current user in session
        // res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        // req.session.destroy();
        // res.send(200);
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];
        // newUser.roles = ['admin'];

        UserModel.findUserByUsername(newUser.username)
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
        // .then(
        //     // login user if promise resolved
        //     function(doc) {
        //         req.session.currentUser = doc;
        //         res.json(doc);
        //     },
        //     // send error if promise rejected
        //     function(err) {
        //         res.status(400).send(err);
        //     }
        // );

    }


    function findAllUsers(req, res) {
        // if (isAdmin(req.session.currentUser)) {
        if (isAdmin(req.user)) {
            UserModel.findAllUsers()
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
        UserModel.findUserById(req.params._id)
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
        UserModel.findUserByUsername(req.params.username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        // console.log("server create");

        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        UserModel.findUserByUsername(newUser.username)
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
        // console.log("server update");
        var newUser = req.body;

        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        // if (!isAdmin(req.session.currentUser)) {
        //     delete newUser.roles;
        // }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        UserModel.updateUser(req.params.id, newUser)
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
        // console.log("server delete ", req.params.id);
        UserModel.deleteUser(req.params.id)
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

    function findUserFavorites(req, res) {
        var userId = req.params.userId;
        var user = null;

        UserModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function(doc) {
                    user = doc;
                    // fetch courses this user likes
                    // console.log("findUserFavorites doc.likes: ", doc.likes);
                    return CourseModel.findCoursesByCourseIds(doc.likes);
                },
                // reject promise if error
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch courses this user likes
                function(courses) {
                    // list of courses this user likes
                    // courses are not stored in database, only added for UI rendering
                    user.likesCourses = courses;
                    // console.log(courses);
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserCompleted(req, res) {
        var userId = req.params.userId;
        var user = null;

        UserModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function(doc) {
                    user = doc;
                    // fetch courses this user completed
                    // console.log("findUserFavorites doc.likes: ", doc.likes);
                    return CourseModel.findCoursesByCourseIds(doc.completed);
                },
                // reject promise if error
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch courses this user completed
                function(courses) {
                    // list of courses this user completed
                    // courses are not stored in database, only added for UI rendering
                    user.completedCourses = courses;
                    // console.log(courses);
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserInProgress(req, res) {
        var userId = req.params.userId;
        var user = null;

        UserModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function(doc) {
                    user = doc;
                    // fetch courses this user inprogress
                    // console.log("findUserFavorites doc.likes: ", doc.likes);
                    return CourseModel.findCoursesByCourseIds(doc.inprogress);
                },
                // reject promise if error
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch courses this user inprogress
                function(courses) {
                    // list of courses this user inprogress
                    // courses are not stored in database, only added for UI rendering
                    user.inprogressCourses = courses;
                    // console.log(courses);
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};
