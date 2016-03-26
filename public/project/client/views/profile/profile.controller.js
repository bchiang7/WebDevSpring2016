(function() {
    angular
        .module("CourseApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var username = $routeParams.username;

        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserByUsername(username)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }
        init();

        function updateUser(user) {
            console.log("controller update");
            console.log(user);
            UserService
                .updateUser(user)
                .then(
                    function(response) {
                        $location.url("/dashboard");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function deleteUser(user) {
            console.log("controller delete");
            console.log(user);
            UserService
                .deleteUser(user)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }


    }

})();
