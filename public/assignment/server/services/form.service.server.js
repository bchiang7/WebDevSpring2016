module.exports = function(app, UserModel, FormModel) {

    app.get     ("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get     ("/api/assignment/form/:formId", findFormById);
    app.post    ("/api/assignment/user/:userId/form", createFormForUser);
    app.put     ("/api/assignment/form/:formId", updateFormById);
    app.delete  ("/api/assignment/user/:userId/form/:formId", deleteFormById);


    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        //console.log("server userId = " + userId);

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
        // console.log("server findFormById");

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
        var userId = req.params.userId;
        var form = req.body;
        //form.userId = userId;

        FormModel
            .createFormForUser(userId, form)
            .then (
                function(form) {
                    //res.json(form);
                    return FormModel.findAllFormsForUser(userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        //console.log(formId);
        var newForm = req.body;
        var formId = newForm._id;
        FormModel
            .updateFormById(formId, newForm)
            .then(
                function(doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var userId = req.params.userId;
        var formId = req.params.formId;
        //console.log("server deleteFormById " + formId);

        FormModel
            .deleteFormById(formId)
            .then (
                function(form) {
                    //res.json(form);
                    return FormModel.findAllFormsForUser(userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }



}
