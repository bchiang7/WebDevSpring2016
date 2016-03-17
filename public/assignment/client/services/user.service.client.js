(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [{
                "_id": 123,
                "firstName": "Alice",
                "lastName": "Wonderland",
                "username": "alice",
                "password": "alice",
                "roles": ["student"]
            }, {
                "_id": 234,
                "firstName": "Bob",
                "lastName": "Hope",
                "username": "bob",
                "password": "bob",
                "roles": ["admin"]
            }, {
                "_id": 345,
                "firstName": "Charlie",
                "lastName": "Brown",
                "username": "charlie",
                "password": "charlie",
                "roles": ["faculty"]
            }, {
                "_id": 456,
                "firstName": "Dan",
                "lastName": "Craig",
                "username": "dan",
                "password": "dan",
                "roles": ["faculty", "admin"]
            }, {
                "_id": 567,
                "firstName": "Edward",
                "lastName": "Norton",
                "username": "ed",
                "password": "ed",
                "roles": ["student"]
            }],
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };
        return model;

        function findUserByUsername(username) {
            for (var i in model.users) {
                if (model.users[i].username === username) {
                    return model.users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password, callback) {
            // Iterates over the array of current users looking for user object whose username and password match the parameters
            for (var i in model.users) {
                if ((model.users[i].username === username) &&
                    (model.users[i].password === password)) {
                    // Calls back with user found
                    callback(model.users[i]);
                }
            }
            // otherwise null
            return null;
        }

        function findAllUsers(callback) {
            // Calls back with array of all users
            callback(model.users);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user, callback) {
            // Adds property called _id with unique value to the user object parameter. You can use (new Date).getTime() to get a unique time stamp
            user = {
                _id: "id:" + (new Date()).getTime(),
                username: user.username,
                password: user.password
            };
            // Adds the new user to local array of users
            model.users.push(user);
            // Calls back with new user
            // callback(user);
            return user;
        }

        function deleteUserById(userId, callback) {
            // Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
            for (var i in model.users) {
                // If found, removes user from the array of current users
                if (model.users[i].userId === userId) {
                    model.users.splice(i, 1);
                }
            }
            // Calls back with remaining array of all users
            callback(model.users);
        }

        function updateUser(userId, user, callback) {
            // Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
            for (var i in model.users) {
                // If found, updates user with new user properties
                if (model.users[i]._id === userId) {
                    model.users[i].firstName = user.firstName;
                    model.users[i].lastName = user.lastName;
                    model.users[i].password = user.password;

                    callback(model.users[i]);
                }
            }
            // Calls back with updated user
            return model.users[i];
        }

    }
})();
