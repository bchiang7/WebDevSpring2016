(function() {
    angular
        .module("CourseApp")
        .controller("ProgressController", ProgressController);

    function ProgressController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;

        vm.unprogressCourse = unprogressCourse;

        function init() {
            // console.log(userId);
            UserService
                .findUserInProgress(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                        // console.log(vm.user);
                    }
                );
        }
        return init();


        function unprogressCourse(course) {
            if (currentUser) {
                // if currentUser's array of courses liked has this course,
                // then add it to the currentUser's array of courses liked
                // aka IF FILLED IN STAR, THEN UNFAVORITE COURSE
                course.inprogress = [];
                course.inprogress.splice(currentUser);
                CourseService.unprogressCourse(currentUser._id, course);

            } else {
                $location.url("/login");
            }
        }
    }

})();
