(function() {
    angular
        .module("CourseApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        var vm = this;
        vm.login = login;

        function init() {}
        init();

        function login(user) {
            // console.log("login controller");

            if (!user || !user.username || !user.password) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            UserService
                .login(user)
                .then(
                    function(response) {
                        if (response.data) {
                            // UserService.setCurrentUser(response.data);
                            $rootScope.currentUser = response.data;
                            $location.url("/dashboard");
                        } else {
                            $scope.message = "Incorrect username or password";
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
