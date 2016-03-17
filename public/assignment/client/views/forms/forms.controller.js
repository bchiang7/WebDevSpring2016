(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, $rootScope) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        // Using the FormService, get the current array of forms for the currently logged in user and make them available for the view to render
        function init() {
            if($rootScope.currentUser) {
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(forms) {
                    $scope.forms = forms;
                });
            }
        }
        init();

        function addForm(form) {
            // Uses form model and FormService to create a new form
            // form = {
            //     title: $scope.forms.title
            // };
            // Adds the new form to the array of forms
            // $scope.forms.push(form);

            FormService.createFormForUser($rootScope.currentUser._id, form, function(forms) {
                //$scope.forms = forms;
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(forms) {
                    $scope.forms = forms;
                });
            });
        }

        function updateForm(formId) {
            // Uses form model and FormService to update the currently selected form
            // $scope.forms[$scope.selectedFormId] = {
            //     title: $scope.forms.title
            // }
            FormService.updateFormById(formId, form, function() {
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(forms) {
                    $scope.forms[$scope.selectedFormId] = {
                        title: $scope.forms.title
                    }
                });
            });
        }

        function deleteForm(formId) {
            // Uses the FormService to remove the form by index
            // $scope.forms.splice(index, 1);

            FormService.deleteFormById(formId, function() {
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(forms) {
                    $scope.forms = forms;
                });
            });
        }

        function selectForm(formId) {
            console.log("selected");
            console.log($scope.forms);
            // Uses the index to mark the currently selected form
            $scope.selectedFormId = formId;
            // Updates the form with the currently selected form
            // $scope.form = {
            //     title: $scope.forms[formId].title
            // }

        }
    }
})();
