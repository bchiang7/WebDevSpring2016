(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {

        var api = {
            findAllFormsForUser: findAllFormsForUser,
            createFormForUser: createFormForUser,
            updateFormById: updateFormById,
            deleteFormById: deleteFormById
        }
        return api;

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
        
        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }
    }
})();
