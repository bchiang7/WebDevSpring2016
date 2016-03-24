(function() {
    angular
        .module("CourseApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        // var api = {
        //     findUserByUsername: findUserByUsername,
        //     findUserByCredentials: findUserByCredentials,
        //     findAllUsers: findAllUsers,
        //     setCurrentUser: setCurrentUser,
        //     getCurrentUser: getCurrentUser,
        //     createUser: createUser,
        //     deleteUserById: deleteUserById,
        //     updateUser: updateUser
        // };
        return api;

        var api = {
            login: login,
            logout: logout,
            register: register,
            getProfile: getProfile,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };
        return api;


        function login(credentials) {
            return $http.post("/api/project/login", credentials);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function getProfile() {
            return $http.get("/api/project/profile/" + $rootScope.currentUser._id);
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }


    }
})();
