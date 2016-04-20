(function() {
    angular
        .module("CourseApp")
        .controller("DetailsController", DetailsController);

    function DetailsController(CourseService, $location, $routeParams, $rootScope, $scope) {
        var vm = this;
        var courseId = $routeParams.courseID;
        var currentUser = $rootScope.currentUser;

        vm.like = false;
        $scope.course = {};
        vm.message = null;

        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;

        vm.favoriteCourse = favoriteCourse;
        vm.unfavoriteCourse = unfavoriteCourse;

        vm.completeCourse = completeCourse;
        vm.uncompleteCourse = uncompleteCourse;

        vm.progressCourse = progressCourse;
        vm.unprogressCourse = unprogressCourse;

        function init() {
            CourseService
                .findCourseById(courseId)
                .then(
                    function(response) {
                        vm.data = response.data;
                    }
                );

            CourseService
                .findUsersWhoLikeCourse(courseId)
                .then(
                    function(response) {
                        vm.course = response.data;
                        // console.log(vm.course);
                    }
                );

            CourseService
                .findUsersWhoCompletedCourse(courseId)
                .then(
                    function(response) {
                        vm.course = response.data;
                        // console.log(vm.course);
                    }
                );

            CourseService
                .findUsersWhoInProgressCourse(courseId)
                .then(
                    function(response) {
                        vm.course = response.data;
                        // console.log(vm.course);
                    }
                );

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
            if (currentUser) {
                // if currentUser's array of courses liked DOES NOT have this course,
                // then add it to the currentUser's array of courses liked
                // aka IF EMPTY STAR, THEN FAVORITE COURSE
                course.likes = [];
                course.likes.push(currentUser);
                CourseService.favoriteCourse(currentUser._id, course);

                // console.log(currentUser.likes.indexOf(currentUser._id));
            } else {
                $location.url("/login");
            }
        }

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

        function completeCourse(course) {
            if (currentUser) {
                course.completed = [];
                course.completed.push(currentUser);
                CourseService.completeCourse(currentUser._id, course);
                // console.log(currentUser.completed.indexOf(currentUser._id));
            } else {
                $location.url("/login");
            }
        }

        function uncompleteCourse(course) {
            if (currentUser) {
                course.completed = [];
                course.completed.splice(currentUser);
                CourseService.uncompleteCourse(currentUser._id, course);

            } else {
                $location.url("/login");
            }
        }


        function progressCourse(course) {
            if (currentUser) {
                course.inprogress = [];
                course.inprogress.push(currentUser);
                CourseService.progressCourse(currentUser._id, course);
                // console.log(currentUser.inprogress.indexOf(currentUser._id));
            } else {
                $location.url("/login");
            }
        }

        function unprogressCourse(course) {
            if (currentUser) {
                course.inprogress = [];
                course.inprogress.splice(currentUser);
                CourseService.unprogressCourse(currentUser._id, course);

            } else {
                $location.url("/login");
            }
        }




    }
})();
