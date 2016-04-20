(function() {
    angular
        .module("CourseApp")
        .controller("DashboardController", DashboardController);

    function DashboardController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {

        var vm = this;
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;


        function init() {
            UserService
                .findUserFavorites(userId)
                .then(
                    function(response) {
                        vm.user1 = response.data;
                        // console.log(vm.user);
                    }
                );

            UserService
                .findUserCompleted(userId)
                .then(
                    function(response) {
                        vm.user2 = response.data;
                        // console.log(vm.user);
                    }
                );

            UserService
                .findUserInProgress(userId)
                .then(
                    function(response) {
                        vm.user3 = response.data;
                        // console.log(vm.user);
                    }
                );
        }
        return init();

    }
})();
