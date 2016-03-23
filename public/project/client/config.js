(function() {
    angular
        .module("CourseApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/courses", {
                templateUrl: "views/courses/courses.view.html",
                controller: "CoursesController"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashboardController"
            })
            .when("/degree", {
                templateUrl: "views/degree/degree.view.html",
                controller: "DegreeController"
            })
            .when("/details", {
                templateUrl: "views/detials/details.view.html",
                controller: "DetailsController"
            })
            .when("/saved", {
                templateUrl: "views/saved/saved.view.html",
                controller: "SavedController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
