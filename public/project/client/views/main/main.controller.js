(function() {
    angular
        .module("YourNeuApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }


})();
