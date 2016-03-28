module.exports = function(app, FormModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);


    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFormById(formId).fields;
        res.json(fields);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = FormModel.findFieldByFormId(formId, fieldId);
        res.json(field);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = FormModel.createFieldForForm(formId, field);
        res.json(newField);
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var updatedField = FormModel.updateField(formId, fieldId, field);
        res.json(updatedField);
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = FormModel.deleteFieldByFormId(formId, fieldId);
        res.json(fields);
    }

}
