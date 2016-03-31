(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http) {

        var api = {
            findFieldsForForm: findFieldsForForm,
            findFieldForForm: findFieldForForm,
            createFieldForForm: createFieldForForm,
            updateFieldById: updateFieldById,
            deleteFieldFromForm: deleteFieldFromForm
        }
        return api;

        function findFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function findFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function updateFieldById(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }
    }
})();
