(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http) {

        var api = {
            findField: findField,
            findFieldsByForm: findFieldsByForm,
            createField: createField,
            updateField: updateField,
            deleteField: deleteField
        };
        return api;

        function findField(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function createField(formId, field) {
            // console.log("client createField");
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function deleteField(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }




    }
})();
