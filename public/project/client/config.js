(function() {
    angular
        .module("CourseApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    // checkLoggedIn: checkLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashboardController",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkCurrentUser
                }
            })
            .when("/courses", {
                templateUrl: "views/courses/course.view.html",
                controller: "CourseController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/details/:courseID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .when("/favorited", {
                templateUrl: "views/favorited/favorited.view.html",
                controller: "FavoritedController",
                controllerAs: "model",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .when("/completed", {
                templateUrl: "views/completed/completed.view.html",
                controller: "CompletedController",
                controllerAs: "model",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .when("/progress", {
                templateUrl: "views/progress/progress.view.html",
                controller: "ProgressController",
                controllerAs: "model",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .when("/degree", {
                templateUrl: "views/degree/degree.view.html",
                controller: "DegreeController",
                controllerAs: "model",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    // getLoggedIn: getLoggedIn
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/login"
            });
    }

    // function getLoggedIn(UserService, $q) {
    //     var deferred = $q.defer();
    //     UserService
    //         .getCurrentUser()
    //         .then(function(response) {
    //             var currentUser = response.data;
    //             UserService.setCurrentUser(currentUser);
    //             deferred.resolve();
    //         });
    //
    //     return deferred.promise;
    // }

    // function checkLoggedIn(UserService, $q, $location) {
    //     var deferred = $q.defer();
    //     UserService
    //         .getCurrentUser()
    //         .then(function(response) {
    //             var currentUser = response.data;
    //             if (currentUser) {
    //                 UserService.setCurrentUser(currentUser);
    //                 deferred.resolve();
    //             } else {
    //                 deferred.reject();
    //                 $location.url("/login");
    //             }
    //         });
    //     return deferred.promise;
    // }

    function checkCurrentUser($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    function checkAdmin($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user) {
            // console.log("check admin");
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        // console.log("checkLoggedIn");

        $http.get('/api/project/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };
})();
