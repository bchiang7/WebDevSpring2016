(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {

        $scope.login = login;

        function login(user) {
            console.log("login controller");
            if (!user) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(
                    function(response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
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
