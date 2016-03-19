var userMock = require('./user.mock.json');

module.exports = function(app, db) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }
    return api;

    function createUser(user) {
        userMock.push(user);
        return userMock;
    }

    function findAllUsers() {
        return userMock;
    }

    function findUserById(id) {
        for (var i = 0; i < userMock.length; i++) {
            if (userMock[i]._id == id) {
                return userMock[i];
            }
        }
    }

    function updateUser(id, user) {
        var idx = userMock.indexOf(findUserById(id));
        userMock[idx].title = user.title;
        return userMock;
    }

    function deleteUser(id) {
        var user = findUserById(id);
        var idx = userMock.indexOf(user);
        userMock.splice(idx, 1);
        return userMock;
    }

    // returns a single user whose username is equal to username parameter, null otherwise
    function findUserByUsername(username) {
        for (var i in userMock) {
            if (userMock[i].username === username) {
                return userMock[i];
            }
        }
        return null;
    }

    // Accepts an object credentials with properties username and password.
    // Returns a single user from the model whose username and password are equal to the username and password properties in the credentials parameter, null otherwise
    function findUserByCredentials(credentials) {
        for (var i in userMock) {
            if (userMock[i].username === credentials.username &&
                userMock[i].password === credentials.password) {
                return userMock[i];
            }
        }
        return null;
    }



}
