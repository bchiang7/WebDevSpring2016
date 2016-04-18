module.exports = function(app, UserModel, CourseModel) {
    app.get("/api/project/course", findAllCourses);
    app.get("/api/project/course/:courseId", findCourseById);

    app.post("/api/project/course", createCourse);
    app.put("/api/project/course/:courseID", updateCourse);
    app.delete("/api/project/course/:courseID", deleteCourse);

    app.get("/api/project/search/:courseSubject", searchCourseBySubject);
    app.get("/api/project/search/:courseTitle", searchCourseByTitle);

    app.post("/api/project/user/:userId/course/:courseID", userLikesCourse);
    app.get("/api/project/course/:courseID/user", findUserLikes);


    function findAllCourses(req, res) {
        // console.log("server find all courses");
        CourseModel
            .findAllCourses()
            .then(
                function(courses) {
                    res.json(courses);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findCourseById(req, res) {
        // console.log("server findFormById");

        var courseId = req.params.courseId;
        CourseModel
            .findCourseById(courseId)
            .then(
                function(course) {
                    res.json(course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function createCourse(req, res) {
        var course = req.body;
        CourseModel.createCourse(course)
            .then(
                // fetch all the courses
                function(course) {
                    return CourseModel.findAllCourses();
                    // res.json(course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(courses) {
                    res.json(courses);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateCourse(req, res) {
        console.log("server course update");
        // var username = req.params.username;
        var course = req.body;
        CourseModel
            .updateCourse(username, user)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCourse(req, res) {
        console.log("server delete");
        // var username = req.params.username;
        CourseModel
            .deleteCourse(courseID)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }








    function searchCourseBySubject(req, res) {
        console.log("search Course by subject");
    }

    function searchCourseByTitle(req, res) {
        console.log("search Course by title");
    }


    function findUserLikes(req, res) {
        var courseID = req.params.courseID;

        var course = null;
        CourseModel
            .findCourseByCourseID(courseID)
            .then(
                function(doc) {
                    course = doc;
                    if (doc) {
                        return UserModel.findUsersByIds(course.likes);
                    } else {
                        res.json({});
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {
                    course.userLikes = users;
                    res.json(course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesCourse(req, res) {
        var courseOmdb = req.body;
        var userId = req.params.userId;
        var courseID = req.params.courseID;
        var course;

        CourseModel
            .userLikesCourse(userId, courseOmdb)
            // add user to course likes
            .then(
                function(course) {
                    return UserModel.userLikesCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // add course to user likes
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
}
