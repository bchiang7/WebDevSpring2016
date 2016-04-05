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
            deleteField: deleteField,
            sortField: sortField
        };
        return api;

        function findField(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function createField(formId, field) {
            // console.log(field);
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function deleteField(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function sortField(formId, fieldId, startIndex, endIndex) {
            return $http.put("/api/assignment/"+formId+"/form/"+fieldId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }


    }
})();
