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
        }
        return api;

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function createFormForUser(username, form) {
            console.log("create form client");
            return $http.post("/api/assignment/user/" + username + "/form", form);
        }

        function updateFormById(formId, form) {
            return $http.put("/api/assignment/form/" + formId, form);
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }
    }
})();
