(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope, $location) {
        var vm = this;

        vm.error = null;
        vm.message = null;
        vm.update = update;

        vm.currentUser = UserService.getCurrentUser();

        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            UserService
                .updateUser(user)
                .then(
                    function() {
                        return UserService.findUserByCredentials(user.username, user.password);
                    })
                .then(
                    function(response) {
                        if (response.data) {
                            $rootScope.currentUser = response.data;
                            // console.log("hooray!");
                        }
                    });

        }

    }
})();
