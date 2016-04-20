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

            // FAVORITED COURSES
            favoriteCourse: favoriteCourse,
            unfavoriteCourse: unfavoriteCourse,
            findUsersWhoLikeCourse: findUsersWhoLikeCourse,

            // COMPLETED COURSES
            completeCourse: completeCourse,
            uncompleteCourse: uncompleteCourse,
            findUsersWhoCompletedCourse: findUsersWhoCompletedCourse,

            // IN PROGRESS COURSES
            progressCourse: progressCourse,
            unprogressCourse: unprogressCourse,
            findUsersWhoInProgressCourse: findUsersWhoInProgressCourse

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
            // console.log("client create");
            return $http.post("/api/project/course", course);
        }

        function updateCourseById(courseId, course) {
            // console.log(courseId);
            return $http.put("/api/project/course/" + courseId, course);
        }

        function deleteCourseById(courseId) {
            // console.log("client delete", courseId);
            return $http.delete("/api/project/course/" + courseId);
        }


        function favoriteCourse(userId, course) {
            // console.log("client fav");
            return $http.post("/api/project/user/" + userId + "/course/" + course._id + "/favorite", course);
        }
        function unfavoriteCourse(userId, course) {
            // console.log("client unfav");
            return $http.post("/api/project/user/" + userId + "/course/" + course._id + "/unfavorite", course);
        }
        function findUsersWhoLikeCourse(courseID) {
            return $http.get("/api/project/course/" + courseID + "/userlikes");
        }


        function completeCourse(userId, course) {
            // console.log("client complete");
            return $http.post("/api/project/user/" + userId + "/course/" + course._id + "/complete", course);
        }
        function uncompleteCourse(userId, course) {
            // console.log("client uncomplete");
            return $http.post("/api/project/user/" + userId + "/course/" + course._id + "/uncomplete", course);
        }
        function findUsersWhoCompletedCourse(courseID) {
            return $http.get("/api/project/course/" + courseID + "/usercompleted");
        }


        function progressCourse(userId, course) {
            // console.log("client complete");
            return $http.post("/api/project/user/" + userId + "/course/" + course._id + "/progress", course);
        }
        function unprogressCourse(userId, course) {
            // console.log("client uncomplete");
            return $http.post("/api/project/user/" + userId + "/course/" + course._id + "/unprogress", course);
        }
        function findUsersWhoInProgressCourse(courseID) {
            return $http.get("/api/project/course/" + courseID + "/userinprogress");
        }




    }
})();
