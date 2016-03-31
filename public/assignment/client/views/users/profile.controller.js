(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $routeParams, $scope) {
        var vm = this;

        // var username = $routeParams.username;

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

            // console.log("update!");

            UserService
                .updateUser(user)
                .then(
                    function() {
                        return UserService.findUserByCredentials(user.username, user.password);
                    })
                .then(
                    function(response) {
                        if (response.data) {
                            vm.currentUser = response.data;
                            $scope.message = "Profile updated!";
                        }
                    },
                    function(error) {
                        $scope.message = "Incorrect username or password";
                        return;
                    }
                );

        }

    }
})();
