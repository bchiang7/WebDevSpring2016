(function() {
    angular
        .module("CourseApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        // var api = {
        //
        //     findAllUsers: findAllUsers,
        //     findUserByUsername: findUserByUsername,
        //     // findUserByCredentials: findUserByCredentials,
        //
        //     createUser: createUser,
        //     updateUser: updateUser,
        //     deleteUser: deleteUser,
        //
        //     getCurrentUser: getCurrentUser,
        //     setCurrentUser: setCurrentUser,
        //
        //     login: login,
        //     logout: logout,
        //     register: register,
        //     getProfile: getProfile,
        //
        // };
        // return api;
        //
        // function findAllUsers() {
        //     return $http.get("/api/project/user/");
        // }
        // function findUserByUsername(username) {
        //     return $http.get("/api/project/user/" + username);
        // }
        // // function findUserByCredentials(username, password) {
        // //     return $http.get("/api/project/user?username=/" + username + "&password=" + password);
        // // }
        // function createUser(user) {
        //     return $http.post("/api/project/user/", user);
        // }
        // function updateUser(user) {
        //     return $http.put("/api/project/user/" + user.username, user);
        // }
        // function deleteUser(user) {
        //     return $http.delete ("/api/project/user/" + user.username);
        // }
        // function getCurrentUser() {
        //     return $http.get("/api/project/loggedin/");
        // }
        // function setCurrentUser(user) {
        //     $rootScope.currentUser = user;
        // }
        // function login(credentials) {
        //     return $http.post("/api/project/login/", credentials);
        // }
        // function logout() {
        //     return $http.post("/api/project/logout/");
        // }
        // function register(user) {
        //     return $http.post("/api/project/register/", user);
        // }
        // function getProfile() {
        //     return $http.get("/api/project/profile/" + $rootScope.currentUser._id);
        // }

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
            register: register

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
            return $http.post("/api/project/user", user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/project/user/' + userId);
        }


        // function adminCreateUser(user) {
        //     return $http.post("/api/project/admin/user", user);
        // }
        //
        // function adminUpdateUser(userId, user) {
        //     return $http.put('/api/project/admin/user/' + userId, user);
        // }
        //
        // function adminDeleteUser(userId) {
        //     return $http.delete('/api/project/admin/user/' + userId);
        // }


        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }


    }
})();
