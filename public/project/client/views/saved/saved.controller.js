(function() {
    angular
        .module("CourseApp")
        .controller("SavedController", SavedController);

    function SavedController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {
        var vm = this;
        var currentUser = $rootScope.currentUser;

        function init() {
            UserService
                .findCoursesLikedByUser(currentUser)
                .then(
                    function(response) {
                        vm.data = response.data;
                        console.log(vm.data);
                    }
                );
        }
        return init();
    }

})();
