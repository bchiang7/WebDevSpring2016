(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.message = null;
        $scope.register = register;
        $scope.user = {};


        function register(newUser) {


            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            if (user != null) {
                $scope.message = "User already exists";
                return;
            }

            // Checks if the username entered is present in the system
            UserService
                .findUserByUsername(user.username)
                .then(function(response) {
                    vm.message = null;
                    if (response.data !== "null") {
                        vm.message = "User already exists";
                        return;
                    } else {
                        var newUser = {
                            "firstName": "",
                            "lastName": "",
                            "username": user.username,
                            "password": user.password,
                            "email": user.email
                        };

                        UserService.createUser(newUser)
                            .then(function(response) {
                                $rootScope.data = response;
                                var createdUser = response.data;
                                UserService.setCurrentUser(createdUser[createdUser.length - 1]);
                                $location.url("/profile/" + createdUser[createdUser.length - 1].username);
                            });
                    }
                });

        }

    }
})();
