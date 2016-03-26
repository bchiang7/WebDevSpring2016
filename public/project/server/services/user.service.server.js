module.exports = function(app, UserModel, CourseModel) {

    app.get("/api/project/user/", findAllUsers);
    app.get("/api/project/user/:username", findUserByUsername);
    // app.get("/api/project/user?username=/" + username + "&password=" + password, findUserByCredentials);

    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:username", updateUser);
    app.delete("/api/project/user/:username", deleteUser);

    app.post("/api/project/login", login);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/profile/:userId", profile);


    function findAllUsers (req, res) {
        UserModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json (users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        UserModel
            .findUserByUsername(req.params.username)
            .then (
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        var user = req.body;
        UserModel
            .createUser(user)
            .then (
                function(user) {
                    res.json(user);
                },
                function (err) {
                    res.status (400).send ( err);
                }
            );
    }

    function updateUser(req, res) {
        console.log("server update");
        var username = req.params.username;
        var user = req.body;
        UserModel
            .updateUser(username, user)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        console.log("server delete");
        var username = req.params.username;
        UserModel
            .deleteUser(username)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function login(req, res) {
        var credentials = req.body;

        UserModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        // store current user in session
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;

        UserModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by id
        UserModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function(doc) {
                    user = doc;
                    // fetch courses this user likes
                    return CourseModel.findCoursesByCourseIDs(doc.likes);
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
                    // courses are not stored in database
                    // only added for UI rendering
                    user.likesCourses = courses;
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
}
