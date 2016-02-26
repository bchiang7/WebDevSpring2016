(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {


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
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            createUser: createUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return model;


        function createFormForUser(userId, form, callback) {
            // Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
            // Adds property called userId equal to user id parameter
            // Adds new form to local array of forms
            // Calls back with new form

        }

        function findAllFormsForUser(userId, callback) {
            // Iterates over the array of current forms looking for forms whose user id is parameter user id
            // Calls back with found forms for user id parameter, empty array otherwise

            var resultArray[];

            for (var i in model.forms) {
                if (model.forms[i].userId === userId) {
                    resultArray.push(model.forms[i]);
                }
            }
            return resultArray;

        }

        function createUser(user, callback) {
            // Adds property called _id with unique value to the user object parameter. You can use (new Date).getTime() to get a unique time stamp
            // Adds the new user to local array of users
            // Calls back with new user

            var user = {
                username: user.username,
                password: user.password
            };
            model.forms.push(user);
            return user;
        }

        function deleteFormById(formId, callback) {
            // Iterates over array of forms looking for form whose id is form id parameter
            // If found, removes form from current array of forms
            // Calls back with remaining array of forms

            for (var i in model.forms) {
                if (model.forms[i].formId === formId) {
                    model.forms.splice(i, 1);
                    // delete users[i]  <--  this doesn't change the indeces of the other elements
                }
            }
            return model.forms;

        }

        function updateFormById(formId, newForm, callback) {
            // Iterates over array of forms looking for form whose id is form id parameter
            // If found, updates form object with new form values
            // Calls back with update form

            for (var i in model.forms) {
                if (model.forms[i]._id === formId) {
                    model.forms.splice(i, 1);
                    // delete users[i]  <--  this doesn't change the indeces of the other elements
                }
            }
            return model.forms;
        }

    }
})();
