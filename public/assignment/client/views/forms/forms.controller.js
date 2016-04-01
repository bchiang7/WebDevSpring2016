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
                        //vm.forms.push(response.data);
                        vm.forms = response.data;
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
