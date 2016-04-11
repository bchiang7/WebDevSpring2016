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
            // logout: logout,

            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,

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
            // return $rootScope.currentUser;
            return $http.get("/api/assignment/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }



        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        // function updateUser(user) {
        //     return $http.put("/api/assignment/user/" + user.username, user);
        // }
        //
        // function deleteUser(user) {
        //     return $http.delete("/api/assignment/user/" + user.username);
        // }
        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        // function logout() {
        //     return $http.post("/api/assignment/user/logout");
        // }


        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            console.log("register client");
            return $http.post("/api/assignment/register", user);
        }


    }

})();
