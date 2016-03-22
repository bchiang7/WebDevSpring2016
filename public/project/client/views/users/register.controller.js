(function() {
    angular
        .module("YourNeuApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.message = null;
        $scope.register = register;

        // Store the new user object in the $rootScope

        function register(user) {

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

            var user = UserService.findUserByUsername(user.username);

            if (user != null) {
                $scope.message = "User already exists";
                return;
            }

            // Use the UserService to create the new user
            var newUser = UserService.createUser($scope.user, function(user){});

            UserService.setCurrentUser(newUser);

            // Use the $location service to navigate to the profile view
            $location.url("/profile");
        }

    }
})();
