(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($routeParams, FormService, $rootScope, $scope, $location, FieldService) {

        // $scope.changeme = function() {
        //     console.log('yas');
        // }

        var vm = this;
        var formId = $routeParams.formId;
        var currentUser = $rootScope.currentUser;

        vm.newField = null;
        vm.addField = addField;
        vm.editField = editField;
        vm.updateField = updateField;
        vm.deleteField = deleteField;
        vm.sort = sort;
        vm.options = [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];
        vm.fieldOptions = null;

        var optionMap = [{
            key: "Single Line Text Field",
            value: "TEXT"
        }, {
            key: "Multi Line Text Field",
            value: "TEXTAREA"
        }, {
            key: "Date Field",
            value: "DATE"
        }, {
            key: "Dropdown Field",
            value: "OPTIONS"
        }, {
            key: "Checkboxes Field",
            value: "CHECKBOXES"
        }, {
            key: "Radio Buttons Field",
            value: "RADIOS"
        }];



        function init() {
            // console.log(formId);
            FormService
                .findFormById(formId)
                .then(function(response) {
                    vm.data = response.data;
                });

            FieldService
                .findFieldsByForm(formId)
                .then(function(response) {
                    vm.fields = response.data;
                    vm.newField = null;
                });
        }
        init();

        function addField(fieldType) {
            var field = vm.newField; // starts out null
            var optionArray = []; // field options start as an empty array
            $scope.message = null;

            if (fieldType == null) {
                $scope.message = "Please choose a field type!";
            } else if (field == null) {
                $scope.message = "Please fill in all field properties!";
            } else {
                $('#createField').modal('hide');
            }

            if (!(fieldType == 'Single Line Text Field' || fieldType == 'Multi Line Text Field' || fieldType == 'Date Field')) {
                var arrayOptions = vm.optionText.split("\n");
                for (var option in arrayOptions) {
                    var arrayOption = arrayOptions[option].split(":");
                    optionArray.push({
                        label: arrayOption[0],
                        value: arrayOption[1]
                    });
                }
                field.options = optionArray;
            }

            var field = {
                "label": field.label,
                "type": findFieldType(fieldType),
                "placeholder": field.placeholder,
                "options": field.options
            };

            FieldService
                .createField(formId, field)
                .then(init);

        }

        function editField(field) {
            vm.newField = field;

            console.log(field.type);

            if (!(field.type === 'TEXT' || field.type === 'TEXTAREA')) {
                var optionList = [];
                var newOptions = vm.newField.options;
                for (var option in newOptions) {
                    optionList.push(newOptions[option].label + ":" + newOptions[option].value)
                }
                vm.optionText = optionList.join("\n");
            }
        }

        function updateField(field) {
            vm.newField = field;
            var optionArray = [];

            if (!(field.type == 'TEXT' || field.type == 'TEXTAREA')) {
                var arrayOptions = vm.optionText.split("\n");
                for (var option in arrayOptions) {
                    var arrayOption = arrayOptions[option].split(":");
                    optionArray.push({
                        label: arrayOption[0],
                        value: arrayOption[1]
                    });
                }
                vm.newField.options = optionArray;
            }
            FieldService
                .updateField(formId, vm.newField._id, vm.newField)
                .then(init);
        }

        function deleteField(field) {
            FieldService
                .deleteField(formId, field._id)
                .then(init);
        }

        function sort() {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);
        }



        function findFieldType(fieldType) {
            for (var k in optionMap) {
                if (optionMap[k].key == fieldType) {
                    return optionMap[k].value;
                }
            }
        }
    }
})();
