(function() {
    angular
        .module("CourseApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope, $http) {

        var api = {

            findAllCourses: findAllCourses,
            findCourseById: findCourseById,

            createCourse: createCourse,
            updateCourse: updateCourse,
            deleteCourse: deleteCourse,

            // SEARCH
            searchCourseBySubject: searchCourseBySubject,
            searchCourseByTitle: searchCourseByTitle,


            // SAVED COURSES
            userLikesCourse: userLikesCourse,
            findAllCoursesLikedByUser: findAllCoursesLikedByUser
        };
        return api;

        function findAllCourses() {
            return $http.get("/api/project/course");
        }

        function findCourseById(courseId) {
            return $http.get("/api/project/course/" + courseId);
        }

        function createCourse(course) {
            console.log("client create");
            return $http.post("/api/project/course", course);
        }

        function updateCourse(course) {
            // console.log("client update");
            return $http.put("/api/project/course/", course);
        }
        function deleteCourse(course) {
            // console.log("client delete");
            return $http.delete("/api/project/course", course);
        }

        function searchCourseBySubject(subject) {
            return $http.get("/api/project/course/courseSubject");
            // return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }

        function searchCourseByTitle(title) {
            return $http.get("/api/project/course/courseTitle");
            // return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }

        function findUserLikes(courseID) {
            return $http.get("/api/project/course/" + courseID + "/user");
        }

        function userLikesCourse(userId, course) {
            return $http.post("/api/project/user/" + userId + "/course/" + course.courseID, course);
        }

        function findAllCoursesLikedByUser(user) {
            return $http.get("/api/project/user/" + userId + "/course/" + course.courseID, course);
        }


    }
})();
