module.exports = function(app, UserModel, CourseModel) {
    app.get("/api/project/course", findAllCourses);
    app.get("/api/project/course/:courseId", findCourseById);

    app.post("/api/project/course", createCourse);
    app.put("/api/project/course/:courseId", updateCourseById);
    app.delete("/api/project/course/:courseId", deleteCourseById);

    app.post("/api/project/user/:userId/course/:courseId/favorite", favoriteCourse);
    app.post("/api/project/user/:userId/course/:courseId/unfavorite", unfavoriteCourse);
    app.get("/api/project/course/:courseId/userlikes", findUsersWhoLikeCourse);

    app.post("/api/project/user/:userId/course/:courseId/complete", completeCourse);
    app.post("/api/project/user/:userId/course/:courseId/uncomplete", uncompleteCourse);
    app.get("/api/project/course/:courseId/usercompleted", findUsersWhoCompletedCourse);

    app.post("/api/project/user/:userId/course/:courseId/progress", progressCourse);
    app.post("/api/project/user/:userId/course/:courseId/unprogress", unprogressCourse);
    app.get("/api/project/course/:courseId/userinprogress", findUsersWhoInProgressCourse);


    function findAllCourses(req, res) {
        // console.log("server find all courses");
        CourseModel.findAllCourses()
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
        CourseModel.findCourseById(courseId)
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
        var newCourse = req.body;

        CourseModel.createCourse(newCourse)
            .then(
                // fetch all the courses
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

    function updateCourseById(req, res) {
        var newCourse = req.body;
        var courseId = newCourse._id
            // console.log(newCourse);
        CourseModel.updateCourseById(courseId, newCourse)
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
        CourseModel.deleteCourseById(courseId)
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



    function favoriteCourse(req, res) {
        var course = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;
        // console.log("server fav");

        CourseModel.favoriteCourse(userId, course)
            // add USER to array of users who like the COURSE
            .then(
                function(course) {
                    return UserModel.favoriteCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // add COURSE to array of courses a user likes
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function unfavoriteCourse(req, res) {
        var course = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;
        // console.log("server unfav");

        CourseModel.unfavoriteCourse(userId, course)
            // remove USER from array of users who like the COURSE
            .then(
                function(course) {
                    return UserModel.unfavoriteCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // remove COURSE from array of courses a user likes
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function findUsersWhoLikeCourse(req, res) {
        var courseId = req.params.courseId;
        var course = null;

        CourseModel.findCourseById(courseId)
            .then(
                function(doc) {
                    course = doc;
                    // fetch users that like this course
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
                    console.log(course);
                    res.json(course);
                },
                function(err) {
                    // console.log(err);
                    res.status(400).send(err);
                }
            );
    }




    function completeCourse(req, res) {
        var course = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;

        // console.log("server fav");

        CourseModel.completeCourse(userId, course)
            // add USER to array of users who completed the COURSE
            .then(
                function(course) {
                    return UserModel.completeCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // add COURSE to array of courses a user has completed
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function uncompleteCourse(req, res) {
        var course = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;

        // console.log("server unfav");

        CourseModel.uncompleteCourse(userId, course)
            // remove USER from array of users who completed the COURSE
            .then(
                function(course) {
                    return UserModel.uncompleteCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // remove COURSE from array of courses a user has completed
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function findUsersWhoCompletedCourse(req, res) {
        var courseId = req.params.courseId;
        var course = null;

        CourseModel.findCourseById(courseId)
            .then(
                function(doc) {
                    course = doc;
                    // fetch users that are have completed this course
                    if (doc) {
                        return UserModel.findUsersByIds(course.completed);
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
                    course.userCompleted = users;
                    console.log(course);
                    res.json(course);
                },
                function(err) {
                    // console.log(err);
                    res.status(400).send(err);
                }
            );
    }






    function progressCourse(req, res) {
        var course = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;
        // console.log("server fav");

        CourseModel.progressCourse(userId, course)
            // add USER to array of users who are taking the COURSE
            .then(
                function(course) {
                    return UserModel.progressCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // add COURSE to array of courses a user is taking
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function unprogressCourse(req, res) {
        var course = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;
        // console.log("server unfav");

        CourseModel.unprogressCourse(userId, course)
            // remove USER from array of users who are taking the COURSE
            .then(
                function(course) {
                    return UserModel.unprogressCourse(userId, course);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            // remove COURSE from array of courses a user is taking
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function findUsersWhoInProgressCourse(req, res) {
        var courseId = req.params.courseId;
        var course = null;

        CourseModel.findCourseById(courseId)
            .then(
                function(doc) {
                    course = doc;
                    // fetch users that are taking this course
                    if (doc) {
                        return UserModel.findUsersByIds(course.inprogress);
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
                    course.userInProgress = users;
                    console.log(course);
                    res.json(course);
                },
                function(err) {
                    // console.log(err);
                    res.status(400).send(err);
                }
            );
    }














}
