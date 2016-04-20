var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {
    var mongoose = require("mongoose");
    var CourseSchema = require("./course.schema.server.js")(mongoose);
    var Course = mongoose.model("Course", CourseSchema);
    var courses = [];

    var api = {
        findAllCourses: findAllCourses,
        findCourseById: findCourseById,
        findCoursesByCourseIds: findCoursesByCourseIds,

        createCourse: createCourse,
        updateCourseById: updateCourseById,
        deleteCourseById: deleteCourseById,

        // FAVORITED COURSES
        favoriteCourse: favoriteCourse,
        unfavoriteCourse: unfavoriteCourse,

        // COMPLETED COURSES
        completeCourse: completeCourse,
        uncompleteCourse: uncompleteCourse,

        // IN PROGRESS COURSES
        progressCourse: progressCourse,
        unprogressCourse: unprogressCourse
    };
    return api;


    function findAllCourses() {
        // console.log("model find all courses");
        var deferred = q.defer();
        Course.find(
            function(err, courses) {
                if (!err) {
                    deferred.resolve(courses);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
        // return Course.find();
    }

    function findCourseById(courseId) {
        var deferred = q.defer();
        Course.findById(courseId,
            function(err, course) {
                // console.log("model find course by ID:", course);
                if (!err) {
                    deferred.resolve(course);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findCoursesByCourseIds(courseIds) {
        // console.log("findCoursesByCourseIDs");
        var deferred = q.defer();

        // find all courses whose _id's are in passed courseIds array
        Course.find({
            _id: {
                $in: courseIds
            }
        }, function(err, courses) {
            if (!err) {
                deferred.resolve(courses);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function createCourse(course) {
        var deferred = q.defer();
        Course.create(course,
            function(err, course) {
                if (!err) {
                    deferred.resolve(course);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateCourseById(courseId, newCourse) {
        var deferred = q.defer();
        var newCourse = {
                "subject": newCourse.subject,
                "number": newCourse.number,
                "title": newCourse.title,
                "description": newCourse.description,
                "creditHours": newCourse.creditHours,
                "lectureHours": newCourse.lectureHours,
                "prereqs": newCourse.prereqs,
                "level": newCourse.level,
                "type": newCourse.type,
                "likes": [''],
                "userLikes": ['']
            }
        // console.log(newCourse);
        Course.findByIdAndUpdate(courseId, {
                $set: newCourse
            }, {
                new: true,
                upsert: true
            },
            function(err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }


    function deleteCourseById(courseId) {
        // console.log("model delete", courseId);
        var deferred = q.defer();
        Course.remove({
                _id: courseId
            },
            function(err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }


    function favoriteCourse(userId, course) {
        var deferred = q.defer();

        // find the course by course ID
        Course.findOne({
                _id: course._id
            },
            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to list of users who like course
                    doc.likes.push(userId);
                    // save changes
                    doc.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no course, create a new instance
                    course = new Course({
                        subject: course.subject,
                        number: course.number,
                        title: course.title,
                        description: course.description,
                        creditHours: course.creditHours,
                        lectureHours: course.lectureHours,
                        prereqs: course.prereqs,
                        level: course.level,
                        type: course.type,
                        likes: [],
                        completed: [],
                        inprogress: []
                    });

                    // add user to list of users who like course
                    course.likes.push(userId);

                    // save new instance
                    course.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }


    function unfavoriteCourse(userId, course) {
        var deferred = q.defer();

        // find the course by course ID
        Course.findOne({
                _id: course._id
            },
            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to list of users who like course
                    doc.likes.splice(userId);
                    // save changes
                    doc.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // remove user to list of users who like course
                    course.likes.splice(userId);

                    // save new instance
                    course.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }




    function completeCourse(userId, course) {
        var deferred = q.defer();

        // find the course by course ID
        Course.findOne({
                _id: course._id
            },
            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to list of users who completed course
                    doc.completed.push(userId);
                    // save changes
                    doc.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no course, create a new instance
                    course = new Course({
                        subject: course.subject,
                        number: course.number,
                        title: course.title,
                        description: course.description,
                        creditHours: course.creditHours,
                        lectureHours: course.lectureHours,
                        prereqs: course.prereqs,
                        level: course.level,
                        type: course.type,
                        likes: [],
                        completed: [],
                        inprogress: []
                    });

                    // add user to list of users who completed course
                    course.completed.push(userId);

                    // save new instance
                    course.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }


    function uncompleteCourse(userId, course) {
        var deferred = q.defer();

        // find the course by course ID
        Course.findOne({
                _id: course._id
            },
            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to list of users who like course
                    doc.completed.splice(userId);
                    // save changes
                    doc.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // remove user to list of users who like course
                    course.completed.splice(userId);

                    // save new instance
                    course.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }









    function progressCourse(userId, course) {
        var deferred = q.defer();

        // find the course by course ID
        Course.findOne({
                _id: course._id
            },
            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to list of users who completed course
                    doc.inprogress.push(userId);
                    // save changes
                    doc.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no course, create a new instance
                    course = new Course({
                        subject: course.subject,
                        number: course.number,
                        title: course.title,
                        description: course.description,
                        creditHours: course.creditHours,
                        lectureHours: course.lectureHours,
                        prereqs: course.prereqs,
                        level: course.level,
                        type: course.type,
                        likes: [],
                        completed: [],
                        inprogress: []
                    });

                    // add user to list of users who completed course
                    course.inprogress.push(userId);

                    // save new instance
                    course.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }


    function unprogressCourse(userId, course) {
        var deferred = q.defer();

        // find the course by course ID
        Course.findOne({
                _id: course._id
            },
            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to list of users who like course
                    doc.inprogress.splice(userId);
                    // save changes
                    doc.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // remove user to list of users who like course
                    course.inprogress.splice(userId);

                    // save new instance
                    course.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }




}
