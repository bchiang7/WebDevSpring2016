(function() {
    angular
        .module("CourseApp")
        .controller("CompletedController", CompletedController);

    function CompletedController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;

        vm.uncompleteCourse = uncompleteCourse;

        function init() {
            // console.log(userId);
            UserService
                .findUserCompleted(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                        // console.log(vm.user);
                    }
                );
        }
        return init();


        function uncompleteCourse(course) {
            if (currentUser) {
                // if currentUser's array of courses liked has this course,
                // then add it to the currentUser's array of courses liked
                // aka IF FILLED IN STAR, THEN UNFAVORITE COURSE
                course.completed = [];
                course.completed.splice(currentUser);
                CourseService.uncompleteCourse(currentUser._id, course);

            } else {
                $location.url("/login");
            }
        }
    }

})();
