(function() {
    angular
        .module("CourseApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope) {

        var model = {
            courses: [{
                "_id": "000",
                "subject": "CS",
                "number": "1100",
                "title": "Computer Science and Its Applications",
                "instructor": "Martin J. Schedlbauer"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "1200",
                "title": "Computer Science/Information Science Overview 1",
                "instructor": "Jessica F. Biron"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "1210",
                "title": "Computer Science/Information Science Overview 2: Co-op Preparation",
                "instructor": "Kaitlyn S. Hughes"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "1800",
                "title": "Discrete Structures",
                "instructor": "Ghita Amor-Tijani"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "2500",
                "title": "Fundamentals of Computer Science 1",
                "instructor": "Leena Razzaq"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "2510",
                "title": "Fundamentals of Computer Science 2",
                "instructor": "Leena Razzaq"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "2800",
                "title": "Logic and Computation",
                "instructor": "Pete Manolios"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "3200",
                "title": "Database Design",
                "instructor": "Kathleen Durant"
            }, {
                "_id": "000",
                "subject": "CS",
                "number": "3500",
                "title": "Object Oriented Design",
                "instructor": "Benjamin S. Lerner"
            }, ],

            findAllCourses: findAllCourses,
            createCourseForUser: createCourseForUser,
            findAllCoursesForUser: findAllCoursesForUser,
            deleteCourseById: deleteCourseById,
            updateCourseById: updateCourseById
        }
        return model;

        function findAllCourses() {
            return model.courses;
        }

        function createCourseForUser(userId, course, callback) {
            // Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
            var course = {
                // Adds property called userId equal to user id parameter
                _id: "id:" + (new Date()).getTime(),
                title: course.title,
                userId: userId
            };
            // Adds new course to local array of courses
            model.courses.push(course);
            // Calls back with new course
            callback(course);
        }

        function findAllCoursesForUser(userId, callback) {
            // Iterates over the array of current courses looking for courses whose user id is parameter user id
            var resultArray = [];
            for (var i in model.courses) {
                if (model.courses[i]._id === userId) {
                    resultArray.push(model.courses[i]);
                }
            }
            // Calls back with found courses for user id parameter, empty array otherwise
            callback(resultArray);
        }

        function deleteCourseById(courseId, callback) {
            // Iterates over array of courses looking for course whose id is course id parameter
            for (var i in model.courses) {
                // If found, removes course from current array of courses
                if (model.courses[i].courseId === courseId) {
                    model.courses.splice(i, 1);
                }
            }
            // Calls back with remaining array of courses
            callback(model.courses);
        }

        function updateCourseById(courseId, newCourse, callback) {
            // Iterates over array of courses looking for course whose id is course id parameter
            for (var i in model.courses) {
                // If found, updates course object with new course values
                if (model.courses[i]._id === courseId) {
                    model.courses[i]._id = newCourse._id;
                    model.courses[i].title = newCourse.title;
                    model.courses[i].userId = newCourse.userId;

                    callback(model.courses[i]);
                }
            }
            // Calls back with updated course
            return model.courses[i];

        }
    }
})();
