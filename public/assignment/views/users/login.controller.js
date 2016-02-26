(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController() {

        // LoginController() should inject the UserService service you implemented elsewhere

        function login() {
            // Use the UserService to lookup the user
            // If the user exists, Store the user object in the $rootScope
            // Use the $location service to navigate to the profile view
        }

    }
})();
