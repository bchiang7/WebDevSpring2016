(function() {
    angular
        .module("CourseApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {

        // ProfileController() should inject the UserService service you implemented elsewhere
        // Inject the UserService service into the ProfileController constructor
        // Retrieve the currently logged in user from the $rootScope
        // Update the view form with the current user

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        
        if (!$scope.currentUser) {
            $location.url("/dashboard");
        }

        $scope.update = update;

        // Use the UserService to update the current user
        function update(user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user, function(user) {});

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
                // console.log($scope.message);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

    }
})();
