module.exports = function(app, UserModel, CourseModel) {
    app.get("/api/project/course", findAllCourses);
    app.get("/api/project/course/:courseId", findCourseById);

    app.post("/api/project/course", createCourse);
    app.put("/api/project/course/:courseId", updateCourseById);
    app.delete("/api/project/course/:courseId", deleteCourseById);

    app.get("/api/project/search/:courseSubject", searchCourseBySubject);
    app.get("/api/project/search/:courseTitle", searchCourseByTitle);

    app.post("/api/project/user/:userId/course/:courseId", favoriteCourse);
    app.post("/api/project/user/:userId/course/:courseId/unfavorite", unfavoriteCourse);
    app.get("/api/project/course/:courseId/user", findUsersWhoLikeCourse);


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

        // subject: String,
        // number: Number,
        // title: String,
        // description: String,
        // creditHours: Number,
        // lectureHours: Number,
        // prereqs: String,
        // level: String,
        // type: String,
        // // ids of users that like this course
        // likes: [String],
        // // list of users that like this course (use for details page)
        // userLikes: [
        //     {username: String}
        // ]

        if (newCourse.creditHours == undefined) {
            newCourse.creditHours == null;
        }

        CourseModel.createCourse(newCourse)
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
        // console.log(courseId);
        var course = null;
        CourseModel.findCourseById(courseId)
            .then(
                function(doc) {
                    course = doc;
                    if (doc) {
                        // console.log("In doc");
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





    function searchCourseBySubject(req, res) {
        console.log("search Course by subject");
    }

    function searchCourseByTitle(req, res) {
        console.log("search Course by title");
    }

}
