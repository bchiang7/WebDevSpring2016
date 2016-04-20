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

        function init() {
            UserService
                .findUserById(vm.currentUser._id)
                .then(handleSuccess, handleError);
        }
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
            // console.log(user);
            UserService
                .deleteUser(user._id)
                .then(
                    function(response) {
                        $scope.users = response.data;

                        UserService.setCurrentUser(null);
                        $location.url("/login");
                        // req.session.destroy();
                        // res.send(200);

                        $('#deleteUser').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    },
                    function(err) {
                        $scope.error = err;
                        $scope.message = "Uh oh, something went wrong.";
                    }
                );
            // UserService
            //     .logout()
            //     .then(function() {
            //         UserService.setCurrentUser(null);
            //         $location.url("/login");
            //     });
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

    }

})();
