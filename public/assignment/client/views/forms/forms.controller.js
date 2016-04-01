(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location, $routeParams) {
        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        vm.currentUser = $rootScope.currentUser;

        $scope.form = {};

        function init() {
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.forms = response.data;
                        }
                    }
                );
        }
        init();

        function addForm(form) {
            var userId = vm.currentUser._id;
            //console.log("form title: ", form.title);

            FormService
                .createFormForUser(userId, form)
                .then(
                    function(response) {
                        vm.forms = response.data;
                        $scope.message = "New form '" + form.title + "' added!";
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function selectForm(form) {
            FormService
                .findFormById(form._id)
                .then(
                    function(response) {
                        //$scope.form = response.data;
                        vm.form = form;
                        vm.form.title = form.title;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.form = response.data;
                            $scope.message = "Form updated successfully!";
                            //UserService.setCurrentUser(vm.currentUser);
                        }
                    },
                    function (err) {
                        vm.error = err;
                        $scope.message = "Unable to update form :(";
                    }
                );
        }

        function deleteForm(form) {
            //console.log("form to delete: " + form._id);
            FormService
                .deleteFormById(vm.currentUser._id, form._id)
                .then(
                    function(response) {
                        //console.log(vm.forms);
                        vm.forms = response.data;
                        $scope.message = "Form '" + form.title + "' successfully deleted!";
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

        }
    }
})();
