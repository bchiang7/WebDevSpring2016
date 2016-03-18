(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        var vm = this;

        vm.$location = $location;

        $scope.$location = $location;

    }
})();
