module.exports = function() {

    var mongoose = require("mongoose");

    // use mongoose to declare a course schema
    var CourseSchema = mongoose.Schema({
        courseID: String,
        title: String,
        poster: String,
        // ids of users that like this course
        likes: [String],
        // list of users that like this course
        userLikes: [
            {username: String}
        ],
        // store course documents in this collection
    }, {collection: 'project.omdb.course'});

    return CourseSchema;

};
