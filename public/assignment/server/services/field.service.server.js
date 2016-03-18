module.exports = function(app, model, db) {

    app.get("/api/assignment/form/:formId/field", getAllFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);


    function getAllFields (req, res) {
        var fields = model.findAllFields();
        res.json(fields);
    }

    function getFieldById (req, res) {
        var id = req.params.id;
        var field = model.findFieldById(id);
        if(field) {
            res.json(field);
            return;
        }
        res.json({message: "Field not found"});
    }

    function deleteFieldById (req, res) {
        var id = req.params._id;
        if(model.deleteField(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "Field not found"});
    }

    function createField (req, res) {
        var field = req.body;
        model.createField(movie);
        res.send (200);
    }

    function updateFieldById (req, res) {
        var id = req.params._id;
        var field = req.body;
        field = model.updateField(id, field);
        if(field) {
            res.json(field);
            return;
        }
        res.json({message: "Field not found"});
    }



}
