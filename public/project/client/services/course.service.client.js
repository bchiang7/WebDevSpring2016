(function() {
    angular
        .module("CourseApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope, $http) {
        // var api = {
        //     findAllCourses: findAllCourses,
        //     createCourseForUser: createCourseForUser,
        //     findAllCoursesForUser: findAllCoursesForUser,
        //     deleteCourseById: deleteCourseById,
        //     updateCourseById: updateCourseById
        // }
        // return api;

        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            searchCourseByTitle: searchCourseByTitle
        };
        return api;

        function findUserLikes(imdbID) {
            return $http.get("/api/project/movie/"+imdbID+"/user");
        }

        function userLikesCourse(userId, course) {
            return $http.post("/api/project/user/"+userId+"/movie/"+movie.imdbID, movie);
        }

        function searchCourseByTitle(title) {
            // use JSONP since API does not support CORS
            // return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }
    }
})();
