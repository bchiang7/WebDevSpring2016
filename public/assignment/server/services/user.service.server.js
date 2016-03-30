module.exports = function(app, UserModel) {

    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/:username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:username", updateUser);
    app.delete("/api/assignment/user/:username", deleteUser);


    function findAllUsers(req, res) {
        UserModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        UserModel
            .findUserById(req.params._id)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        UserModel
            .findUserByUsername(req.params.username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByUsername(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        UserModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var username = req.params.username;
        var user = req.body;
        UserModel
            .updateUser(username, user)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var username = req.params.username;
        UserModel
            .deleteUser(username)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

}
