(function(){
    angular
        .module("CourseApp")
        .controller("SearchController", SearchController);

    function SearchController(CourseService) {
        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(course) {
            CourseService
                .searchCourseByTitle(course.title)
                .then(function(response){
                    vm.data = response.data;
                });
        }
    }
})();
