module.exports = function() {

    var mongoose = require("mongoose");

    // use mongoose to declare a course schema
    var CourseSchema = mongoose.Schema({
        subject: String,
        number: Number,
        title: String,
        description: String,
        creditHours: Number,
        lectureHours: Number,
        prereqs: [String],
        level: String,
        type: String,
        likes: [String], // ids of users that like this course
        // list of users that like this course
        userLikes: [
            {username: String}
        ]
        // store course documents in this collection
    }, {collection: 'project.course'});

    return CourseSchema;

};
