(function() {
    angular
        .module("CourseApp")
        .controller("SavedController", SavedController);

    function SavedController($scope, $location, CourseService) {

        // Using the CourseService, get the current array of courses for the currently logged in user and make them available for the view to render
        $scope.courses = CourseService.findAllCourses();

    }


})();
