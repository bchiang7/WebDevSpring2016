(function() {
    angular
        .module("CourseApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {

            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            // findUserByCredentials: findUserByCredentials,

            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            login: login,
            logout: logout,
            register: register,
            getProfile: getProfile,

        };
        return api;


        function findAllUsers() {
            return $http.get("/api/project/user/");
        }
        function findUserByUsername(username) {
            return $http.get("/api/project/user/" + username);
        }
        // function findUserByCredentials(username, password) {
        //     return $http.get("/api/project/user?username=/" + username + "&password=" + password);
        // }


        function createUser(user) {
            return $http.post("/api/project/user/", user);
        }
        function updateUser(user) {
            console.log("client update");
            return $http.put("/api/project/user/" + user.username, user);
        }
        function deleteUser(user) {
            console.log("client delete");
            return $http.delete ("/api/project/user/" + user.username);
        }


        function getCurrentUser() {
            return $http.get("/api/project/loggedin/");
        }
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }


        function login(credentials) {
            return $http.post("/api/project/login/", credentials);
        }
        function logout() {
            return $http.post("/api/project/logout/");
        }
        function register(user) {
            return $http.post("/api/project/register/", user);
        }
        function getProfile() {
            return $http.get("/api/project/profile/" + $rootScope.currentUser._id);
        }


    }
})();
