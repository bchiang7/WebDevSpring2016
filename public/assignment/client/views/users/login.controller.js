(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        var vm = this;
        vm.login = login;

        function init() {}
        init();

        function login(user) {

            if (!user || !user.username || !user.password) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            UserService
                .findUserByCredentials(user.username,user.password)
                .then(
                    function(response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }
                        else {
                            $scope.message = "Incorrect username or password";
                        }
                    },
                    function(error) {
                        $scope.message = "Incorrect username or password";
                        return;
                    }
                );
        }

    }
})();
