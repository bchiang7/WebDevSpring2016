(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController() {
        // FormController() should inject the FormService service you implemented elsewhere
        // Using the FormService, get the current array of forms for the currently logged in user and make them available for the view to render

        function addForm() {
            // Uses form model and FormService to create a new form
            // Adds the new form to the array of forms

        }

        function updateForm() {
            // Uses form model and FormService to update the currently selected form
        }

        function deleteForm() {
            // Uses the FormService to remove the form by index
        }

        function selectForm() {
            // Uses the index to mark the currently selected form
            // Updates the form with the currently selected form

        }
    }
})();
