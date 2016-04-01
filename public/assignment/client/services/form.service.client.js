(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {

        var api = {
            findAllFormsForUser: findAllFormsForUser,
            findFormById: findFormById,
            createFormForUser: createFormForUser,
            updateFormById: updateFormById,
            deleteFormById: deleteFormById
        };
        return api;

        function findAllFormsForUser(userId) {
            //console.log("client userId = " + userId);
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId, formId);
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }

        function deleteFormById(formId) {
            //console.log("client deleteFormById " + formId);
            return $http.delete("/api/assignment/form/" + formId);
        }
    }
})();
