module.exports = function(mongoose) {

    // use mongoose to declare a course schema
    var CourseSchema = mongoose.Schema({
        imdbID: String,
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
