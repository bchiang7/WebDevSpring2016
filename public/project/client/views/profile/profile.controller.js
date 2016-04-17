(function() {
    angular
        .module("CourseApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $routeParams, $scope) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;
        vm.currentUser = UserService.getCurrentUser();

        function init() {}
        init();

        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            // console.log(user);
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.message = "Profile updated!";
                    },
                    function(err) {
                        $scope.error = err;
                        $scope.message = "Uh oh, something went wrong.";
                    }
                );
        }

        function remove(user) {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

    }

})();
