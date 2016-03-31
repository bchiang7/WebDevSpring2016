module.exports = function(app, FieldModel) {

    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);


    function findFieldsForForm(req, res) {
        var formId = req.params.formId;
        FieldModel
            .findFieldsForForm(formId)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        FieldModel
            .findFieldForForm(formId, fieldId)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        FieldModel
            .createFieldForForm(formId, field)
            .then (
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        FieldModel
            .updateFieldById(formId, fieldId, field)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        FieldModel
            .deleteFieldFromForm(formId, fieldId)
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
