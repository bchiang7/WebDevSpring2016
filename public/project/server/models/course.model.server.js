var mock = require("./course.mock.json");

// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {

    var mongoose = require("mongoose");

    // load course schema from course model
    var CourseSchema = require("./course.schema.server.js")(mongoose);

    // create course from schema
    var Course  = mongoose.model("Course", CourseSchema);

    var courses = [];
    var api = {
        findCourseByImdbID: findCourseByImdbID,
        findCoursesByImdbIDs: findCoursesByImdbIDs,
        createCourse: createCourse,
        userLikesCourse: userLikesCourse
    };
    return api;

    function userLikesCourse (userId, course) {

        var deferred = q.defer();

        // find the course by imdb ID
        Course.findOne({imdbID: course.imdbID},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a course
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
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
                        imdbID: course.imdbID,
                        title: course.Title,
                        poster: course.Poster,
                        likes: []
                    });
                    // add user to likes
                    course.likes.push (userId);
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

    function findCoursesByImdbIDs (imdbIDs) {

        var deferred = q.defer();

        // find all courses
        // whose imdb IDs
        // are in imdbIDs array
        Course.find({
            imdbID: {$in: imdbIDs}
        }, function (err, courses) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(courses);
            }
         })
        return deferred.promise;
    }

    function createCourse(course) {

        // create instance of course
        var course = new Course({
            imdbID: course.imdbID,
            poster: course.Poster,
            title: course.Title,
            likes: []
        });

        var deferred = q.defer();

        // save course to database
        course.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findCourseByImdbID(imdbID) {

        var deferred = q.defer();

        Course.findOne({imdbID: imdbID}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}
