var courses = require('./form.mock.json');

module.exports = function(app, db) {

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    }
    return api;

    function createForm() {

    }

    function findAllForms() {

    }

    function findFormById() {

    }

    function updateForm() {

    }

    function deleteForm() {

    }

    // returns a single form whose title is equal to title parameter, null otherwise
    function findFormByTitle(title) {

    }



}
