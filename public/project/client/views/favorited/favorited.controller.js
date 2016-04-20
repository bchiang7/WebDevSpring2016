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
        }
        return init();
    }

})();
