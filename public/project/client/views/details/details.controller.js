(function() {
    angular
        .module("CourseApp")
        .controller("DetailsController", DetailsController);

    function DetailsController(CourseService, $location, $routeParams, $rootScope, $scope) {
        var vm = this;
        var courseId = $routeParams.courseID;
        var currentUser = $rootScope.currentUser;

        // console.log(courseId);

        $scope.course = {};
        vm.message = null;

        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.favoriteCourse = favoriteCourse;


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
            console.log(course);
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
            console.log("course to delete: " + course._id);
            CourseService
                .deleteCourseById(course._id)
                .then(
                    function(response) {
                        //console.log(vm.courses);
                        vm.courses = response.data;
                        $scope.message = "Course '" + course.title + "' successfully deleted!";
                        $location.url("/courses");

                        $('#deleteCourse').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

        }

        function favoriteCourse(course) {
            console.log(course);
            if (currentUser) {
                vm.course.likes = [];
                vm.course.likes.push(currentUser._id);

                MovieService.favoriteCourse(currentUser._id, course);

            } else {
                $location.url("/login");
            }
        }
    }
})();
