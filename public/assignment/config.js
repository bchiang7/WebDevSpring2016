(function() {
    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/form", {
                templateUrl: "/views/forms/forms.view.html",
                controller:  "FormsController"
            })
            .when("/admin", {
                templateUrl: "/views/users/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
