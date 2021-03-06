module.exports = function(app, FormModel, FieldModel) {

    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.put("/api/assignment/form/:formId/startIndex/:startIndex/endIndex/:endIndex", sortField);


    function fieldsForFormId(req, res) {
        var formId = req.params.formId;

        FieldModel.findFieldsByFormId(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        FieldModel.findField(formId, fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFieldToForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;

        // console.log(field);

        FieldModel.createField(formId, field)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var field = req.body;
        //var fieldId = req.params.fieldId;
        var formId = req.params.formId;

        FieldModel.updateField(formId, field)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        FieldModel.deleteField(formId, fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function sortField(req, res) {
        var formId = req.params.formId;
        var startIndex = req.params.startIndex;
        var endIndex = req.params.endIndex;

        // console.log("SERVER ", formId, startIndex, endIndex);

        if (startIndex && endIndex) {
            FieldModel
                .sortField(formId, startIndex, endIndex)
                .then(
                    function(stat) {
                        return res.json(200);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }


};
