(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {

        // LoginController() should inject the UserService service you implemented elsewhere
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password, function(user){
                if(user != null) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                }
            })
        }

    }
})();
