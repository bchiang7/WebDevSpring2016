(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {

        $scope.login = login;
        $scope.user = {};

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                });
        }

    }
})();
