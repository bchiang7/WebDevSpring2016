(function() {
    angular
        .module("CourseApp")
        .controller("SavedController", SavedController);

    function SavedController(UserService, CourseService, $rootScope, $scope, $location, $routeParams) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        function init() {
            CourseService
                .findCoursesLikedByUser(vm.currentUser)
                .then(
                    function(response) {
                        // vm.profile = response.data;
                        console.log("saved controller response");
                    }
                );
        }
        return init();
    }

})();
