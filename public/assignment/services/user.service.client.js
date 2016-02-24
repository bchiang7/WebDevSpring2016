(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        // Declare a local empty array of current users
        var users = [];

        var users = [{
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
        }]


        function findUserByCredentials(username, password, callback)() {
            // Iterates over the array of current users looking for user object whose username and password match the parameters

            // Calls back with user found or null otherwise

            for (var i = 0; i < users.length; i++) {

            }
            return ;

        }

        function findAllUsers(callback) {
            // Calls back with array of all users
            return callback;
        }

        function createUser(user, callback) {
            // Adds property called _id with unique value to the user object parameter. You can use (new Date).getTime() to get a unique time stamp

            // Adds the new user to local array of users

            // Calls back with new user
        }

        function deleteUserById(userId, callback) {
            // Iterates over the array of current users looking for a user object whose user id is equal to parameter user id

            // If found, removes user from the array of current users

            // Calls back with remaining array of all users
        }

        function updateUser(userId, user, callback) {
            // Iterates over the array of current users looking for a user object whose user id is equal to parameter user id

            // If found, updates user with new user properties

            // Calls back with updated user
        }

    }
})();
