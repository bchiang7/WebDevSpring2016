(function() {
    angular
        .module("CourseApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $location, $routeParams) {

        var vm = this;

        var username = $routeParams.username;
        // console.log(username);

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();




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
