(function() {
    angular
        .module("CourseApp")
        .controller("CoursesController", CoursesController);

    function CoursesController(vm, $location, CourseService, $rootScope, $routeParams) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.removeApplication = removeApplication;

        vm.createCourse = createCourse;
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.selectCourse = selectCourse;

        // vm.courses = CourseService.findAllCourses();

        function init() {
            CourseService
                .findAllCourses()
                .then(
                    function(response) {
                        vm.course = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
        }
        init();


        function createCourse(course) {
            CourseService
                .createCourse(course)
                .then(
                    function(response) {
                        // var currentUser = response.data;
                        // if (currentUser != null) {
                        //     UserService.setCurrentUser(currentUser);
                        //     $location.url("/dashboard");
                        // }
                    });
        }

        function updateCourse(course) {
            console.log("controller update");
            console.log(course);
            CourseService
                .updateCourse(user)
                .then(
                    function(response) {
                        $location.url("/courses");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function deleteCourse(course) {
            console.log("controller delete");
            console.log(course);
            CourseService
                .deleteCourse(course)
                .then(
                    function(response) {
                        $location.url("/courses");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function selectCourse(index) {
            // vm.selectedCourseIndex = index;
            //
            // vm.course = {
            //     number: vm.courses[index].number,
            //     title: vm.courses[index].title,
            //     instructor: vm.courses[index].instructor,
            // }
        }
    }
})();
