(function() {
    angular
        .module("FormBuilderApp")
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

            adminCreateUser: adminCreateUser,
            adminUpdateUser: adminUpdateUser,
            adminDeleteUser: adminDeleteUser,

            login: login,
            logout: logout,
            register: register

        };
        return api;

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }


        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }


        function adminCreateUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function adminUpdateUser(userId, user) {
            return $http.put('/api/assignment/admin/user/' + userId, user);
        }

        function adminDeleteUser(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }


        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }



    }

})();
