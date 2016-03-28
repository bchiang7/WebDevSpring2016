var mock = require('./user.mock.json');

module.exports = function(app, db) {

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById
    }
    return api;

    function findAllUsers() {
        return mock;
    }

    function findUserById(id) {
        for (var i in mock) {
            if (mock[i]._id === id) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var i in mock) {
            if (mock[i].username === username) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        console.log("user model");
        for (var u in mock) {
            if (mock[u].username === username &&
                mock[u].password === password) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function updateUser(userId, user) {
        // var user_to_update = findUserIndexById(userId);
        // mock[user_to_update] = user;
        // return user;

        for (var i in mock) {
            if (mock[i]._id === userId) {
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].password = user.password;
                return mock[i];
            }
        }
        return null;
    }

    function deleteUserById(id) {
        for (var i in mock) {
            if (mock[i]._id === userId) {
                mock.splice(i, 1);
            }
        }
        return mock;
    }

}
