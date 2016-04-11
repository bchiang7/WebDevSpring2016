(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;

        vm.register = register;

        function init() {}
        init();

        function register(user) {
            // console.log("register controller");
            // UserService
            //     .createUser(user)
            //     .then(function(response) {
            //         var currentUser = response.data;
            //         if (currentUser != null) {
            //             UserService.setCurrentUser(currentUser);
            //             $location.url("/profile");
            //         }
            //     });

            if (user.password != user.password2 || !user.password || !user.password2) {
                $scope.error = "Your passwords don't match";
            } else {
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var user = response.data;
                            if (user != null) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
            }
        }
    }
})();
