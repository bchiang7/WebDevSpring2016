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
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
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

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function updateUser(user) {
            return $http.put("/api/assignment/user/" + user.username, user);
        }

        function deleteUser(user) {
            return $http.delete("/api/assignment/user/" + developer.username);
        }

    }

})();
