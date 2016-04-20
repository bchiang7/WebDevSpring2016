(function() {
    angular
        .module("CourseApp")
        .controller("FavoritedController", FavoritedController);

    function FavoritedController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;

        vm.unfavoriteCourse = unfavoriteCourse;

        function init() {
            // console.log(userId);
            UserService
                .findUserFavorites(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                    }
                );
        }
        return init();


        function unfavoriteCourse(course) {
            if (currentUser) {
                // if currentUser's array of courses liked has this course,
                // then add it to the currentUser's array of courses liked
                // aka IF FILLED IN STAR, THEN UNFAVORITE COURSE
                course.likes = [];
                course.likes.splice(currentUser);
                CourseService.unfavoriteCourse(currentUser._id, course);

            } else {
                $location.url("/login");
            }
        }
    }

})();
