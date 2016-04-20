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
                        vm.user = response.data;
                        // console.log(vm.user);
                    }
                );
        }
        return init();

    }
})();
