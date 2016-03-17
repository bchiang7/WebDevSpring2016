var courses = require('./user.mock.json');

module.exports = function(app, db) {

    var api = {
        // create
        createUser: createUser,
        // findAll
        findAllUsers: findAllUsers,
        // findById
        findUserById: findUserById,
        // update
        updateUser: updateUser,
        // delete
        deleteUser: deleteUser

        // findUserByUsername(username)
        findUserByUsername: findUserByUsername,
        // findUserByCredentials(credentials)
        findUserByCredentials: findUserByCredentials
    }
    return api;

    function createUser() {

    }

    function findAllUsers() {

    }

    function findUserById() {

    }

    function updateUser() {

    }

    function deleteUser() {

    }

    // returns a single user whose username is equal to username parameter, null otherwise
    function findUserByUsername(username) {

    }

    // Accepts an object credentials with properties username and password. Returns a single user from the model whose username and password are equal to the username and password properties in the credentials parameter, null otherwise
    function findUserByCredentials(credentials) {

    }



}
