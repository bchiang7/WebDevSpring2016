module.exports = function(app, UserModel) {

    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);


    function findAllUsers(req, res) {
        var allUsers = UserModel.findAllUsers();
        res.json(allUsers);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = UserModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = UserModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        console.log("Server service");
        var username = req.query.username;
        var password = req.query.password;
        var user = UserModel.findUserByCredentials(username, password);
        res.json(user);
    }

    function createUser(req, res) {
        var new_user = req.body;
        UserModel.createUser(new_user);
        res.json(new_user);
    }

    function updateUser(req, res) {
        var id = req.params._id;
        var user = req.body;
        user = UserModel.updateUser(id, user);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var userId = req.params._id;
        UserModel.deleteUserById(userId);
        var users = UserModel.findAllUsers();
        res.json(users);
    }

}
