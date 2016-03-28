(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register(newUser) {
            $scope.message = null;

            if ($scope.user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            if (!$scope.user.username) {
                $scope.message = "Please provide a username";
                return;
            }

            if (!$scope.user.password || !$scope.user.passwordVerify) {
                $scope.message = "Please provide a password";
                return;
            }

            UserService
                .createUser($scope.user)
                .then(function(response) {
                    var user = response.data;
                    if (!user) {
                        $scope.message = "User was not created";
                        return;
                    }

                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });

        }
    }
})();
