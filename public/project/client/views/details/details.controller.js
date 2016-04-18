(function() {
    angular
        .module("CourseApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $rootScope, $location, CourseService) {
        // var vm = this;
        // var courseID = $routeParams.courseID;
        // var currentUser = $rootScope.currentUser;
        // vm.favorite = favorite;
        //
        // function init() {
        //     OmdbService
        //         .findCourseByCourseID(courseID)
        //         .then(function(response) {
        //             vm.data = response.data;
        //         });
        //
        //     CourseService
        //         .findUserLikes(courseID)
        //         .then(function(response) {
        //             vm.course = response.data;
        //         });
        // }
        // init();
        //
        // function favorite(course) {
        //     if (currentUser) {
        //         vm.course.likes = [];
        //         vm.course.likes.push(currentUser._id);
        //         CourseService
        //             .userLikesCourse(currentUser._id, course);
        //     } else {
        //         $location.url("/login");
        //     }
        // }
    }
})();
