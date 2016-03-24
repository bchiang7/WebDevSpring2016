(function() {
    angular
        .module("CourseApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;

        vm.login = login;

        function init() {}
        init();

        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/dashboard");
                    }
                });
        }
    }
})();
