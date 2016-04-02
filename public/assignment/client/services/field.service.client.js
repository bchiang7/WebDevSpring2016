(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http) {

        var api = {
            findField: findField,
            findFieldsByFormId: findFieldsByFormId,
            createField: createField,
            updateField: updateField,
            deleteField: deleteField

            //getFieldsForForm: getFieldsForForm,
            //findFieldForForm: findFieldForForm,
            //createFieldForForm: createFieldForForm,
            //updateFieldById: updateFieldById,
            //deleteFieldFromForm: deleteFieldFromForm
        };
        return api;


        function findField(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByFormId(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function createField(formId, field) {
            console.log("client create field");
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function deleteField (formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }


    }
})();
