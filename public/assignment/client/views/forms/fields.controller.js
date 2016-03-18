(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, $scope, $routeParams) {
        var vm = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        vm.fields = [];

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });

        }
        init();

        vm.addField = addField;
        $vm.deleeUser = deleteField;

        function addField(fieldType) {
            var field = null;
            //Set default field information
            if (fieldType === "Text") {
                field = {
                    "_id": null,
                    "label": "New Text Field",
                    "type": "Text",
                    "placeholder": "New Field"
                };
            } else if (fieldType === "Textarea") {
                field = {
                    "_id": null,
                    "label": "New Text Field",
                    "type": "Textarea",
                    "placeholder": "New Field"
                };
            } else if (fieldType === "Date") {
                field = {
                    "_id": null,
                    "label": "New Date Field",
                    "type": "Date"
                };
            } else if (fieldType === "Options") {
                field = {
                    "_id": null,
                    "label": "New Dropdown",
                    "type": "Options",
                    "options": [{
                        "label": "Option 1",
                        "value": "OPTION_1"
                    }, {
                        "label": "Option 2",
                        "value": "OPTION_2"
                    }, {
                        "label": "Option 3",
                        "value": "OPTION_3"
                    }]
                };
            } else if (fieldType === "Checkboxes") {
                field = {
                    "_id": null,
                    "label": "New Checkboxes",
                    "type": "CHECKBOXES",
                    "options": [{
                        "label": "Option A",
                        "value": "OPTION_A"
                    }, {
                        "label": "Option B",
                        "value": "OPTION_B"
                    }, {
                        "label": "Option C",
                        "value": "OPTION_C"
                    }]
                };
            } else {
                field = {
                    "_id": null,
                    "label": "New Radio Buttons",
                    "type": "RADIOS",
                    "options": [{
                        "label": "Option X",
                        "value": "OPTION_X"
                    }, {
                        "label": "Option Y",
                        "value": "OPTION_Y"
                    }, {
                        "label": "Option Z",
                        "value": "OPTION_Z"
                    }]
                };
            }

            FieldService
                .createFieldForForm(formId, field)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }
    }
})();
