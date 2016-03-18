module.exports = function(app, model, db) {

    app.get("/api/assignment/form/:formId/form", getAllForms);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/form/:formId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);


    function getAllForms (req, res) {
        var forms = model.findAllForms();
        res.json(forms);
    }

    function getFormById (req, res) {
        var id = req.params.id;
        var form = model.findFormById(id);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function deleteFormById (req, res) {
        var id = req.params._id;
        if(model.deleteForm(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "Form not found"});
    }

    function createForm (req, res) {
        var form = req.body;
        model.createForm(movie);
        res.send (200);
    }

    function updateFormById (req, res) {
        var id = req.params._id;
        var form = req.body;
        form = model.updateForm(id, form);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }



}
