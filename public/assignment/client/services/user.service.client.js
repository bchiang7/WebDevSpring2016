(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=alice&password=wonderland" + username, password);

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/assignment/user" + user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/:id" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/:id" + userId, user);
        }

    }
})();