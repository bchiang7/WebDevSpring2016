(function() {
    angular
        .module("CourseApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $rootScope, $location, OmdbService, CourseService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function(response) {
                    vm.data = response.data;
                });

            MovieService
                .findUserLikes(imdbID)
                .then(function(response) {
                    vm.movie = response.data;
                });
        }
        init();

        function favorite(movie) {
            if (currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();
