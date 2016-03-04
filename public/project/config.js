(function() {
    angular
        .module("YourNeuApp")
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
            .when("/studentServices", {
                templateUrl: "views/studentServices/studentServices.view.html",
                controller: "StudentServicesController"
            })
            .when("/registration", {
                templateUrl: "views/registration/registration.view.html",
                controller: "RegisterController"
            })
            .when("/schedule", {
                templateUrl: "views/schedule/schedule.view.html",
                controller: "ScheduleController"
            })
            .when("/degree", {
                templateUrl: "views/degree/degree.view.html",
                controller: "DegreeController"
            })
            .when("/courses", {
                templateUrl: "views/courses/courses.view.html",
                controller: "CoursesController"
            })
            .when("/fields", {
                templateUrl: "views/courses/fields.view.html",
                controller: "FieldsController"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
