module.exports = function() {

    var mongoose = require("mongoose");

    // var UserSchema = require("./user.schema.server.js")(mongoose);

    // use mongoose to declare a course schema
    var CourseSchema = mongoose.Schema({
        subject: {type: String, default: "SUBJECT"},
        number: {type: Number, default: 0000},
        title: {type: String, default: "New Course"},
        description: {type: String, default: "Course description"},
        creditHours: {type: Number, default: 4},
        lectureHours: {type: Number, default: 4},
        prereqs: {type: String, default: "Undergraduate"},
        level: {type: String, default: "Undergraduate"},
        type: {type: String, default: "Lecture"},
        // ids of users that like this course
        likes: [String],
        // list of users that like this course (use for details page)
        userLikes: [
            {username: String, firstName: String, lastName: String}
        ],
        // ids of users that like this course
        completed: [String],
        // list of users that like this course (use for details page)
        userCompleted: [
            {username: String, firstName: String, lastName: String}
        ],
        // ids of users that like this course
        inprogress: [String],
        // list of users that like this course (use for details page)
        userInProgress: [
            {username: String, firstName: String, lastName: String}
        ],

        // store course documents in this collection
    }, {collection: 'project.course'});

    return CourseSchema;

};
