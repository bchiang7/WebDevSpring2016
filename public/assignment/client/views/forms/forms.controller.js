(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.form = {};

        function getForms() {
            FormService
                .findAllFormsForUser($rootScope.currentUser._id)
                .then(function(response) {
                    if (response.data) {
                        $scope.forms = response.data;
                    }
                });
        }
        getForms();

        function addField(userId, form) {
            FormService
                .createFormForUser(userId, form)
                .then(function(response) {
                    if (response.data) {
                        $scope.form = {};
                        retrieveForms();
                    }
                });
        }

        function selectForm(index) {
            $scope.form = {
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId,
                _id: $scope.forms[index]._id
            }
        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(function(response) {
                    if (response.data) {
                        $scope.form = {};
                        $scope.forms = retrieveForms();
                    }
                });
        }

        function deleteForm(index) {
            var form = $scope.forms[index];

            FormService
                .deleteFormById(form._id)
                .then(function(response) {
                    if (response.data) {
                        retrieveForms();
                        $scope.form = {};
                    }
                });
        }
    }
})();
