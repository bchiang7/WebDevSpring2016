module.exports = function() {

    var mongoose = require("mongoose");

    var CourseSchema = require("./course.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        nuid: Number,
        roles: [String],
        // ids of courses this user likes
        likes: [String],
        // list of courses this user likes (use to display user's favorited courses)
        likesCourses: [CourseSchema],
        // ids of courses this user completed
        completed: [String],
        // list of courses this user completed (use to display user's completed courses)
        completedCourses: [CourseSchema],
        // ids of courses this user is taking
        inprogress: [String],
        // list of courses this user is taking (use to display user's in progress courses)
        inprogressCourses: [CourseSchema],
        // collection name to 'user'
    }, {collection: 'project.user'});
    return UserSchema;
};
