module.exports = function(app, FormModel) {

    app.get("/api/assignment/form/:formId/form", findAllForms);
    app.get("/api/assignment/form/:formId", findFormById); app.post("/api/assignment/form/:formId/form", createFormForUser); app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);


    function findAllForms(req, res) {
        var forms = FormModel.findAllForms();
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = FormModel.findFormById(formId);
        res.json(form);
    }

    function createFormForUser(req, res) {
        var user = req.params.userId;
        var newForm = req.body;
        var form = FormModel.createForm(newForm);
        res.json(form);
    }

    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        var updatedForm = FormModel.updateForm(id, form);
        res.send(updatedForm);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var form = FormModel.deleteFormById(formId);
        res.json(form);
    }



}
