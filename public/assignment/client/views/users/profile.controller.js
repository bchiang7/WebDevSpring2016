(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope, $location) {

        $scope.error = null;
        $scope.message = null;
        $scope.update = update;

        $scope.currentUser = UserService.getCurrentUser();

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {

            UserService
                .updateUser(user._id, user)
                .then(function() {
                    return UserService.findUserByCredentials(user.username, user.password);
                })
                .then(function(response){
                    if (response.data){
                        $rootScope.currentUser = response.data;
                        console.log("hooray!");
                    }
                });

        }

    }
})();
