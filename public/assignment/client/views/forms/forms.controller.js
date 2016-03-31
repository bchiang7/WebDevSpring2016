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

        // console.log(vm.currentUser);

        function getForms() {
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(
                    function(response) {
                        if (response.data) {
                            $scope.forms = response.data;
                        }
                    });
        }
        getForms();

        function addForm(form) {

            username = form.username;
            FormService
                .createFormForUser(username, form)
                .then (
                    function(response) {
                        $location.url ("/user/" + form._id + "/form");
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
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
                        // $scope.forms = retrieveForms();
                    }
                });
        }

        function deleteForm(index) {
            var form = $scope.forms[index];

            FormService
                .deleteFormById(form._id)
                .then(function(response) {
                    if (response.data) {
                        // retrieveForms();
                        $scope.form = {};
                    }
                });
        }
    }
})();
