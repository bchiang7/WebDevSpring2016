module.exports = function(app, UserModel, CourseModel) {
    app.get("/api/project/course", findAllCourses);
    app.get("/api/project/course/:courseId", findCourseById);

    app.post("/api/project/course", createCourse);
    app.put("/api/project/course/:courseId", updateCourseById);
    app.delete("/api/project/course/:courseId", deleteCourseById);

    app.get("/api/project/search/:courseSubject", searchCourseBySubject);
    app.get("/api/project/search/:courseTitle", searchCourseByTitle);

    app.post("/api/project/user/:userId/course/:courseId", userLikesCourse);
    app.get("/api/project/course/:courseId/user", findUserLikes);


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
        var courseId = req.params.courseId;
        // console.log("server find course by ID:", courseId);
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
                    // console.log("here");
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

    function updateCourseById(req, res) {
        var newCourse = req.body;
        var courseId = newCourse._id
        // console.log(newCourse);
        CourseModel
            .updateCourseById(courseId, newCourse)
            .then(
                function(doc) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCourseById(req, res) {

        var courseId = req.params.courseId;

        // console.log("server delete ", courseId);
        CourseModel
            .deleteCourseById(courseId)
            .then(
                function(course) {
                    return CourseModel.findAllCourses();
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
            .findCourseById(courseID)
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
        console.log("server user likes course");
        var course = req.body;
        var userId = req.params.userId;
        var courseID = req.params.courseID;
        var course;

        CourseModel
            .userLikesCourse(userId, course)
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
