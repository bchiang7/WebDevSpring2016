(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        var vm = this;
        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function() {
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    });
        }
    }
})();
