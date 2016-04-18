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
        updateCourseById: updateCourseById,
        deleteCourseById: deleteCourseById,

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
        // return Course.find();
    }

    function findCourseById(courseId) {
        // console.log("model find course by ID:", courseId);
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
        Course
            .remove({
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
