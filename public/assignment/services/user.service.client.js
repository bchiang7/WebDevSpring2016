(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

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

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };
        return model;


        function findUserByCredentials(username, password, callback) {
            // Iterates over the array of current users looking for user object whose username and password match the parameters
            // Calls back with user found or null otherwise
            for (var i in model.users) {
                if ((model.users[i].username === username) &&
                    (model.users[i].password === password)) {
                    return users[i];
                }
            }
            return null;
        }

        function findAllUsers(callback) {
            // Calls back with array of all users
            return model.users;
        }

        function createUser(user, callback) {
            // Adds property called _id with unique value to the user object parameter. You can use (new Date).getTime() to get a unique time stamp
            // Adds the new user to local array of users
            // Calls back with new user

            var user = {
                username: user.username,
                password: user.password
            };
            model.users.push(user);
            return user;
        }

        function deleteUserById(userId, callback) {
            // Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
            // If found, removes user from the array of current users
            // Calls back with remaining array of all users

            for (var i in model.users) {
                if (model.users[i].userId === userId) {
                    model.users.splice(i, 1);
                    // delete users[i]  <--  this doesn't change the indeces of the other elements
                }
            }
            return model.users;
        }

        function updateUser(userId, user, callback) {
            // Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
            // Calls back with updated user

            for (var i in model.users) {
                // If found, updates user with new user properties
                if (model.users[i].userId === userId) {
                    model.users[i].firstName = user.firstName;
                    model.users[i].lastName = user.lastName;
                    model.users[i].password = user.password;
                }
            }
            return model.user[i];
        }

    }
})();
