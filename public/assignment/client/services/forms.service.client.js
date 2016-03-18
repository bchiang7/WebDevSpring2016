(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {

        findAllForms: findAllForms,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById

        function findAllForms() {
            // return model.forms;
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/form/:formId/form" + userId, form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/form/:formId/form" + userId);
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/:formId" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/:formId" + formId, newForm);
        }
    }
})();
