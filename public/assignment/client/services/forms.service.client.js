(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {

        var model = {
            forms: [{
                "_id": "000",
                "title": "Contacts",
                "userId": 123
            }, {
                "_id": "010",
                "title": "ToDo",
                "userId": 123
            }, {
                "_id": "020",
                "title": "CDs",
                "userId": 234
            }, ],

            findAllForms: findAllForms,
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return model;

        function findAllForms() {
            return model.forms;
        }

        function createFormForUser(userId, form, callback) {
            // Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
            var form = {
                // Adds property called userId equal to user id parameter
                _id: "id:" + (new Date()).getTime(),
                title: form.title,
                userId: userId
            };
            // Adds new form to local array of forms
            model.forms.push(form);
            // Calls back with new form
            callback(model.forms);
        }

        function findAllFormsForUser(userId, callback) {
            // Iterates over the array of current forms looking for forms whose user id is parameter user id
            var resultArray = [];
            for (var i in model.forms) {
                if (model.forms[i].userId === userId) {
                    resultArray.push(model.forms[i]);
                }
            }
            // Calls back with found forms for user id parameter, empty array otherwise
            callback(resultArray);
        }

        function deleteFormById(formId, callback) {
            // Iterates over array of forms looking for form whose id is form id parameter
            for (var i in model.forms) {
                // If found, removes form from current array of forms
                if (model.forms[i]._id === formId) {
                    model.forms.splice(i, 1);
                }
            }
            // Calls back with remaining array of forms
            callback(model.forms);
        }

        function updateFormById(formId, newForm, callback) {
            // Iterates over array of forms looking for form whose id is form id parameter
            for (var i in model.forms) {
                // If found, updates form object with new form values
                if (model.forms[i]._id === formId) {
                    model.forms[i]._id = newForm._id;
                    model.forms[i].title = newForm.title;
                    model.forms[i].userId = newForm.userId;

                    callback(model.forms[i]);
                }
            }
            // Calls back with updated form
            return model.forms[i];

        }
    }
})();
