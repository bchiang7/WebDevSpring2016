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

            logout: logout,

            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
        return api;

        function findAllUsers() {
            // console.log("find all users");
            return $http.get("/api/assignment/user");
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/" + username);
        }

        function findUserByCredentials(username, password) {
            // console.log("find by creds");
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function getCurrentUser() {
            // return $rootScope.currentUser;
            return $http.get("/api/assignment/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/assignment/user/logout");
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
