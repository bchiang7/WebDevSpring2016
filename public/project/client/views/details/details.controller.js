(function() {
    angular
        .module("CourseApp")
        .controller("DetailsController", DetailsController);

    function DetailsController(CourseService, $location, $routeParams, $rootScope, $scope) {
        var vm = this;
        var courseId = $routeParams.courseID;
        var currentUser = $rootScope.currentUser;

        vm.like = false;

        // console.log(courseId);

        $scope.course = {};
        vm.message = null;

        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.favoriteCourse = favoriteCourse;


        function init() {
            CourseService
                .findUsersWhoLikeCourse(courseId)
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
            // console.log(course);
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
            // console.log(course);
            if (currentUser) {
                // if currentUser's array of courses liked DOES NOT have this course,
                // then add it to the currentUser's array of courses liked
                // aka IF EMPTY STAR, THEN FAVORITE COURSE
                if (currentUser.likes.indexOf(currentUser._id) == -1) {

                    vm.course.likes = [];
                    vm.course.likes.push(currentUser);

                    CourseService.favoriteCourse(currentUser._id, course);
                    vm.like = true;
                    console.log("details controller favorited");
                }
                // if currentUser's array of courses liked has this course,
                // then add it to the currentUser's array of courses liked
                // aka IF FILLED IN STAR, THEN UNFAVORITE COURSE
                // else if (currentUser.likes.indexOf(currentUser._id) > -1) {
                //
                //     vm.course.likes.splice(currentUser);
                //
                //     console.log("unfavorited");
                // }



            } else {
                $location.url("/login");
            }
        }
    }
})();
