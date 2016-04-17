(function() {
    angular
        .module("CourseApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {

        $scope.orderByField = 'username';
        $scope.reverseSort = false;

        $scope.add = add;
        $scope.select = select;
        $scope.update = update;
        $scope.remove = remove;

        $scope.clearFields = clearFields;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function add(user) {
            UserService
                .adminCreateUser(user)
                .then(handleSuccess, handleError);

            // once user is added clear input fields
            clearFields();
        }

        function select(user) {
            $scope.user = angular.copy(user);
        }

        function update(user) {
            UserService
                .adminUpdateUser(user._id, user)
                .then(handleSuccess, handleError);

            // once user is updated clear input fields
            clearFields();
        }

        function remove(user) {
            UserService
                .adminDeleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

        function clearFields() {
            document.getElementById('input-username').value = "";
            document.getElementById('input-password').value = "";
            document.getElementById('input-first').value = "";
            document.getElementById('input-last').value = "";
            document.getElementById('input-emails').value = "";
            document.getElementById('input-roles').value = "";
        }
    }
})();
