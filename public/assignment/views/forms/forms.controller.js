(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService) {
        // FormController() should inject the FormService service you implemented elsewhere
        // Using the FormService, get the current array of forms for the currently logged in user and make them available for the view to render

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.forms = FormService.findAllForms();

        function addForm(form) {
            // Uses form model and FormService to create a new form
            form = {
                title: $scope.forms.title
            };
            // Adds the new form to the array of forms
            $scope.forms.push(form);
        }

        function updateForm(form) {
            // Uses form model and FormService to update the currently selected form
            $scope.forms[$scope.selectedFormIndex] = {
                title: $scope.forms.title
            }
        }

        function deleteForm(index) {
            // Uses the FormService to remove the form by index
            $scope.forms.splice(index, 1);
        }

        function selectForm(index) {
            // Uses the index to mark the currently selected form
            $scope.selectedFormIndex = index;
            // Updates the form with the currently selected form
            $scope.form = {
                title: $scope.forms[index].title
            }

        }
    }
})();
