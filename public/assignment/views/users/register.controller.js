(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService) {

        // RegisterController() should inject the UserService service you implemented elsewhere in this assignment

        // Use the UserService to create the new user
        // Store the new user object in the $rootScope
        // Use the $location service to navigate to the profile view
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
            var newUser = UserService.createUser($scope.user);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
        }

    }
})();
