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
                    });

            //console.log("init userId = " + vm.currentUser._id);
        }
        init();

        function addForm(form) {
            var userId = vm.currentUser._id;
            //console.log("addForm clicked by userId", userId);

            FormService
                .createFormForUser(userId, form)
                .then (
                    function(response) {
                        vm.forms = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
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
                        //$scope.error = "Unable to update the user";
                        return;
                    }
                );
        }

        function deleteForm(index) {

            var form = vm.forms[index];

            //console.log("deleteForm " + form._id);

            FormService
                .deleteFormById(form._id)
                .then(
                    function(response) {
                        console.log(vm.forms);
                        //vm.forms = response.data;
                        //FormService.findAllFormsForUser()
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

        }
    }
})();
