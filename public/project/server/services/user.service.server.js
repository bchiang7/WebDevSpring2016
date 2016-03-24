module.exports = function(app, UserModel, CourseModel) {

    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);


    function login(req, res) {
        var credentials = req.body;

        //console.log(credentials);

        UserModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    req.session.currentUser = doc;
                    res.json({message: "hello"});
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
                    return CourseModel.findCoursesByImdbIDs(doc.likes);
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
