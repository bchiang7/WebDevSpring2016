(function() {
    angular
        .module("CourseApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope, $http) {

        var api = {

            findAllCourses: findAllCourses,
            findCourseById: findCourseById,

            createCourse: createCourse,
            updateCourseById: updateCourseById,
            deleteCourseById: deleteCourseById,

            // SAVED COURSES
            favoriteCourse: favoriteCourse,
            findUserLikes: findUserLikes,
            findAllCoursesLikedByUser: findAllCoursesLikedByUser,

            // SEARCH
            searchCourseBySubject: searchCourseBySubject,
            searchCourseByTitle: searchCourseByTitle
        };
        return api;

        function findAllCourses() {
            // console.log("client find all courses");
            return $http.get("/api/project/course");
        }

        function findCourseById(courseId) {
            // console.log("client find course by ID", courseId);
            return $http.get("/api/project/course/" + courseId);
        }

        function createCourse(course) {
            console.log("client create");
            return $http.post("/api/project/course", course);
        }

        function updateCourseById(courseId, course) {
            console.log(courseId);
            return $http.put("/api/project/course/" + courseId, course);
        }

        function deleteCourseById(courseId) {
            console.log("client delete", courseId);
            return $http.delete("/api/project/course/" + courseId);
        }


        function favoriteCourse(userId, course) {
            console.log(userId, course);
            return $http.post("/api/project/user/" + userId + "/course/" + course._id, course);
        }

        function findUserLikes(courseID) {
            return $http.get("/api/project/course/" + courseID + "/user");
        }

        function findAllCoursesLikedByUser(user) {
            // return $http.get("/api/project/user/" + userId + "/course/" + course.courseID, course);
        }



        function searchCourseBySubject(subject) {
            return $http.get("/api/project/course/courseSubject");
            // return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }

        function searchCourseByTitle(title) {
            return $http.get("/api/project/course/courseTitle");
            // return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }

    }
})();
