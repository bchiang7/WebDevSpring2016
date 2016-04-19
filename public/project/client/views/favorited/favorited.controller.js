(function() {
    angular
        .module("CourseApp")
        .controller("FavoritedController", FavoritedController);

    function FavoritedController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;

        function init() {
            // console.log(userId);
            UserService
                .findUserFavorites()
                .then(
                    function(response) {
                        vm.user = response.data;
                    }
                );

            // UserService
            //     .findUserById(userId)
            //     .then(function(response) {
            //         vm.data = response.data;
            //     });
        }
        return init();
    }

})();
