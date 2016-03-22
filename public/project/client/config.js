(function() {
    angular
        .module("CourseApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashboardController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/saved", {
                templateUrl: "views/saved/saved.view.html",
                controller: "SavedController"
            })
            .when("/degree", {
                templateUrl: "views/degree/degree.view.html",
                controller: "DegreeController"
            })
            .when("/courses", {
                templateUrl: "views/courses/courses.view.html",
                controller: "CoursesController"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
