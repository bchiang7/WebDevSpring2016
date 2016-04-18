(function() {
    angular
        .module("CourseApp")
        .controller("DetailsController", DetailsController);

    function DetailsController(CourseService, $routeParams, $rootScope, $location) {
        var vm = this;
        var courseId = $routeParams.courseID;
        var currentUser = $rootScope.currentUser;

        // console.log(courseId);

        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.saveCourse = saveCourse;


        function init() {
            CourseService
                .findUserLikes(courseId)
                .then(
                    function(response) {
                        vm.course = response.data;
                    }
                );
            CourseService
                .findCourseById(courseId)
                .then(function(response) {
                    vm.data = response.data;
                });
        }
        init();

        function updateCourse(course) {
            CourseService
                .updateCourseById(course._id, course)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.course = response.data;
                            $scope.message = "Course updated successfully!";
                            //UserService.setCurrentUser(vm.currentUser);
                        }
                    },
                    function(err) {
                        vm.error = err;
                        $scope.message = "Unable to update course :(";
                    }
                );
        }

        function deleteCourse(course) {
            //console.log("course to delete: " + course._id);
            CourseService
                .deleteCourseById(vm.currentUser._id, course._id)
                .then(
                    function(response) {
                        //console.log(vm.courses);
                        vm.courses = response.data;
                        $scope.message = "Course '" + course.title + "' successfully deleted!";
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

        }

        function saveCourse(course) {
            if (currentUser) {
                vm.course.likes = [];
                vm.course.likes.push(currentUser._id);
                CourseService
                    .userLikesCourse(currentUser._id, course);
            } else {
                $location.url("/login");
            }
        }
    }
})();
