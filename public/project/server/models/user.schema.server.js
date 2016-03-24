module.exports = function(mongoose) {

    var CourseSchema = require("./course.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        // imdb ids of courses this user likes
        likes: [String],
        // courses this user likes
        likesCourses: [CourseSchema],
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});
    return UserSchema;
};
