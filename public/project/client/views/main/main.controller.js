(function() {
    angular
        .module("CourseApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }


})();
