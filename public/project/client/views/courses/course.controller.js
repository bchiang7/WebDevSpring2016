(function() {
    angular
        .module("CourseApp")
        .controller("CourseController", CourseController);

    function CourseController(CourseService, $scope, $rootScope, $location, $routeParams) {

        $scope.orderByField = 'subject';
        $scope.reverseSort = false;

        var vm = this;
        vm.message = null;
        vm.newCourse = null;
        vm.addCourse = addCourse;
        vm.selectCourse = selectCourse;
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;

        vm.favoriteCourse = favoriteCourse;
        vm.unfavoriteCourse = unfavoriteCourse;

        vm.completeCourse = completeCourse;
        vm.uncompleteCourse = uncompleteCourse;

        vm.progressCourse = progressCourse;
        vm.unprogressCourse = unprogressCourse;

        vm.like = false;

        var currentUser = $rootScope.currentUser;

        $scope.course = {};

        function init() {
            CourseService
                .findAllCourses()
                .then(handleSuccess, handleError);
        }
        init();

        function handleSuccess(response) {
            $scope.courses = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }




        function addCourse(course) {
            // console.log(course);
            // var userId = currentUser._id;
            var course = vm.newCourse; // starts out null

            var course = {
                "subject": course.subject,
                "number": course.number,
                "title": course.title,
                "description": course.description,
                "creditHours": course.creditHours,
                "lectureHours": course.lectureHours,
                "prereqs": course.prereqs,
                "level": course.level,
                "type": course.type,
                "likes": [''],
                "userLikes": ['']
            };

            // console.log(course);

            CourseService
                .createCourse(course)
                .then(
                    function(response) {
                        vm.courses = response.data;
                        $scope.message = "New course '" + course.title + "' added!";
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

            // CourseService.findAllCourses();
        }

        function selectCourse(course) {
            CourseService
                .findCourseById(course._id)
                .then(
                    function(response) {
                        //$scope.course = response.data;
                        vm.course = course;
                        vm.course.title = course.title;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function updateCourse(course) {
            // console.log(course);
            CourseService
                .updateCourseById(course._id, course)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.course = response.data;
                            $scope.message = "Course updated successfully!";
                            //UserService.setCurrentUser(currentUser);
                        }
                    },
                    function(err) {
                        vm.error = err;
                        $scope.message = "Unable to update course :(";
                    }
                );
        }

        function deleteCourse(course) {
            // console.log("course to delete: " + course._id);
            CourseService
                .deleteCourseById(course._id)
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

        function favoriteCourse(course) {
            if (currentUser) {
                // if currentUser's array of courses liked DOES NOT have this course,
                // then add it to the currentUser's array of courses liked
                // aka IF EMPTY STAR, THEN FAVORITE COURSE
                course.likes = []; // array of users who like this course
                course.likes.push(currentUser);
                CourseService.favoriteCourse(currentUser._id, course);
                $scope.message = "'" + course.title + "' added to favorites!";

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
                $scope.message = "'" + course.title + "' removed from favorites";
            } else {
                $location.url("/login");
            }
        }


        function completeCourse(course) {
            if (currentUser) {
                course.completed = []; // array of users who like this course
                course.completed.push(currentUser);
                CourseService.completeCourse(currentUser._id, course);
                $scope.message = "'" + course.title + "' added to completed courses!";

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
                $scope.message = "'" + course.title + "' removed from completed courses";
            } else {
                $location.url("/login");
            }
        }


        function progressCourse(course) {
            if (currentUser) {
                course.inprogress = []; // array of users who like this course
                course.inprogress.push(currentUser);
                CourseService.progressCourse(currentUser._id, course);
                $scope.message = "'" + course.title + "' added to in progress courses!";

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
                $scope.message = "'" + course.title + "' removed from in progress courses";
            } else {
                $location.url("/login");
            }
        }
    }
})();
