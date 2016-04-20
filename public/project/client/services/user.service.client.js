(function() {
    angular
        .module("CourseApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var api = {
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,

            // adminCreateUser: adminCreateUser,
            // adminUpdateUser: adminUpdateUser,
            // adminDeleteUser: adminDeleteUser,

            login: login,
            logout: logout,
            register: register,

            findUserFavorites: findUserFavorites

        };
        return api;

        function findAllUsers() {
            // console.log("client find");
            return $http.get("/api/project/user");
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function getCurrentUser() {
            return $http.get("/api/project/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function createUser(user) {
            // console.log("client create");
            return $http.post("/api/project/user", user);
        }

        function updateUser(userId, user) {
            // console.log("client update");
            return $http.put('/api/project/user/' + userId, user);
        }

        function deleteUser(userId) {
            // console.log("client delete");
            return $http.delete('/api/project/user/' + userId);
        }


        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            // console.log("client register");
            return $http.post("/api/project/register", user);
        }

        // FOR FAVORITED/PROFILE PAGE
        function findUserFavorites(userId) {
            // console.log("client findUserFavorites");
            return $http.get("/api/project/user/" + userId + "/favorites");
        }

    }
})();
