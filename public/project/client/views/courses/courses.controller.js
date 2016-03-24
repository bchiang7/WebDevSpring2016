(function() {
    angular
        .module("CourseApp")
        .controller("CoursesController", CoursesController);

    function CoursesController($scope, $location, CourseService) {

        $scope.addCourse = addCourse;
        $scope.updateCourse = updateCourse;
        $scope.deleteCourse = deleteCourse;
        $scope.selectCourse = selectCourse;

        // Using the CourseService, get the current array of courses for the currently logged in user and make them available for the view to render
        $scope.courses = CourseService.findAllCourses();

        function addCourse(course) {
            // Uses course model and CourseService to create a new course
            course = {
                title: $scope.courses.title
            };
            // Adds the new course to the array of courses
            $scope.courses.push(course);

            // CourseService.createCourseForUser(userId, course, function(courses) {
            //     $scope.courses = courses;
            // });
        }

        function updateCourse(course) {
            // Uses course model and CourseService to update the currently selected course
            $scope.courses[$scope.selectedCourseIndex] = {
                number: $scope.courses.number,
                title: $scope.courses.title,
                instructor: $scope.courses.instructor
            }
        }

        function deleteCourse(index) {
            // Uses the CourseService to remove the course by index
            $scope.courses.splice(index, 1);
        }

        function selectCourse(index) {
            //console.log("selected");
            // Uses the index to mark the currently selected course
            $scope.selectedCourseIndex = index;
            // Updates the course with the currently selected course
            $scope.course = {
                number: $scope.courses[index].number,
                title: $scope.courses[index].title,
                instructor: $scope.courses[index].instructor,
            }
        }
    }
})();
