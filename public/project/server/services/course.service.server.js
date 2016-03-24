module.exports = function(app, courseModel, userModel) {
    app.post("/api/project/user/:userId/course/:imdbID", userLikesCourse);
    app.get("/api/project/course/:imdbID/user", findUserLikes);

    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;

        var course = null;
        CourseModel
            .findCourseByImdbID(imdbID)
            .then (
                function (doc) {
                    course = doc;
                    if (doc) {
                        return UserModel.findUsersByIds(course.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    course.userLikes = users;
                    res.json(course);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesCourse(req, res) {
        var courseOmdb  = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var course;

        CourseModel
            .userLikesCourse(userId, courseOmdb)
            // add user to course likes
            .then(
                function (course) {
                    return UserModel.userLikesCourse(userId, course);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add course to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
