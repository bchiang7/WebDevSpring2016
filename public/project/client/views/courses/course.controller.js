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
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.selectCourse = selectCourse;

        vm.currentUser = $rootScope.currentUser;

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




        function addCourse() {
            // console.log(course);
            // var userId = vm.currentUser._id;
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

            console.log(course);

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
    }
})();
