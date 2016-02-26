(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {

        // ProfileController() should inject the UserService service you implemented elsewhere
        // Inject the UserService service into the ProfileController constructor
        // Retrieve the currently logged in user from the $rootScope
        // Update the view form with the current user


        $scope.error = null;
        $scope.message = null;

//        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        // Use the UserService to update the current user
        function update(user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user);

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

    }
})();
