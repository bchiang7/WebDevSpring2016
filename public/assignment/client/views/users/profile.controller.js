(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $routeParams, $scope) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;
        vm.currentUser = UserService.getCurrentUser();

        function init() {}
        init();

        if(!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            // console.log(user);
            UserService
                // .updateUser(user)
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
                // .then(
                //     function() {
                //         return UserService.findUserByCredentials(user.username, user.password);
                //     })
                // .then(
                //     function(response) {
                //         if (response.data) {
                //             vm.currentUser = response.data;
                //             $scope.message = "Profile updated!";
                //         }
                //     },
                //     function(error) {
                //         $scope.message = "Uh oh, something went wrong.";
                //         return;
                //     }
                // );

        }

    }
})();
