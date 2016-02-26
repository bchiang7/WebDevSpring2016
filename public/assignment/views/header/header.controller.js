(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        // function logout() {
        //     UserService.setCurrentUser(null);
        //     $location.url("/home");
        // }
    }
})();
