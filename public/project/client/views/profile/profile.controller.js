(function() {
    angular
        .module("CourseApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $routeParams, $scope) {
        var vm = this;
        vm.currentUser = UserService.getCurrentUser();
        vm.error = null;
        vm.message = null;
        vm.update = update;
        vm.remove = remove;

        function init() {}
        init();

        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            console.log(user);
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
            console.log(user);
            UserService
                .deleteUser(user._id)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.message = "User deleted!";
                        $location.url("/login");
                        req.session.destroy();
                        res.send(200);
                    },
                    function(err) {
                        $scope.error = err;
                        $scope.message = "Uh oh, something went wrong.";
                    }
                );
        }

        // function handleSuccess(response) {
        //     $scope.users = response.data;
        // }
        //
        // function handleError(error) {
        //     $scope.error = error;
        // }

    }

})();
