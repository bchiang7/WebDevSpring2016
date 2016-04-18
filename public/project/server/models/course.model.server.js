var mock = require("./course.mock.json");

// load q promise library
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

        createCourse: createCourse,
        updateCourse: updateCourse,
        deleteCourse: deleteCourse,

        // SEARCH
        searchCourseBySubject: searchCourseBySubject,
        searchCourseByTitle: searchCourseByTitle,


        // SAVED COURSES
        userLikesCourse: userLikesCourse,
        findAllCoursesLikedByUser: findAllCoursesLikedByUser
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
    }

    function findCourseById(courseId) {
        var deferred = q.defer();
        Course.findById(courseId,
            function(err, course) {
                if (!err) {
                    deferred.resolve(course);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function createCourse(course) {
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        // Course.create(course, function(err, doc) {
        //     if (err) {
        //         deferred.reject(err);
        //     } else {
        //         deferred.resolve(doc);
        //     }
        // });
        // create instance of course
        // var newCourse = new Course({
        //     "subject": course.subject,
        //     "number": course.number,
        //     "title": course.title,
        //     "description": course.description,
        //     "creditHours": course.creditHours,
        //     "lectureHours": course.lectureHours,
        //     "prereqs": course.prereqs,
        //     "level": course.level,
        //     "type": course.type,
        //     "likes": [''],
        //     "userLikes": ['']
        // });

        // console.log(newCourse);

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

    function updateCourse(courseID, course) {
        console.log("model update");
        var deferred = q.defer();
        Course.update({
                    courseID: courseID
                }, {
                    $set: course
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

    function deleteCourse(courseID) {
        console.log("delete clicked");
        var deferred = q.defer();
        Course
            .remove({
                    courseID: courseID
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




    function searchCourseBySubject(subject) {
        console.log('search by subject');
    }

    function searchCourseByTitle(title) {
        console.log('search by title');
    }


    function userLikesCourse(userId, course) {

        var deferred = q.defer();

        // find the course by imdb ID
        Course.findOne({
                courseID: course.courseID
            },

            function(err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a course
                if (doc) {
                    // add user to likes
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
                    // if there's no course
                    // create a new instance
                    course = new Course({
                        courseID: course.courseID,
                        title: course.Title,
                        poster: course.Poster,
                        likes: []
                    });
                    // add user to likes
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

    function findAllCoursesLikedByUser(user) {
        console.log("find all courses liked by a certain user");
    }



    function findCourseByCourseID(courseID) {

        var deferred = q.defer();

        Course.findOne({
            courseID: courseID
        }, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}
