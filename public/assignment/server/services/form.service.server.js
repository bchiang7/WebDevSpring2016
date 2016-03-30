module.exports = function(app, FormModel) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById); app.post("/api/assignment/user/:formId/form", createFormForUser); app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);


    function findAllFormsForUser(req, res) {
        var userId = req.params._id;
        FormModel
            .findAllFormsForUser(userId)
            .then (
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        FormModel
            .findFormById(formId)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        var username = req.params.username;
        var form = req.body;
        FormModel
            .createFormForUser(username, form)
            .then (
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        FormModel
            .updateFormById(formId, form)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        FormModel
            .deleteFormById(formId)
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
