var courses = require('./form.mock.json');

module.exports = function(app, db) {

    var api = {
        // create
        createForm: createForm,
        // findAll
        findAllForms: findAllForms,
        // findById
        findFormById: findFormById,
        // update
        updateForm: updateForm,
        // delete
        deleteForm: deleteForm

        // findFormByTitle(title)
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
