var formMock = require('./form.mock.json');

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

    function createForm(form) {
        formMock.push(form);
        return formMock;
    }

    function findAllForms() {
        return formMock;
    }

    function findFormById(id) {
        for (var i = 0; i < formMock.length; i++) {
            if (formMock[i]._id == id) {
                return formMock[i];
            }
        }
    }

    function updateForm(id, form) {
        var idx = formMock.indexOf(findUserById(id));
        formMock[idx].title = form.title;
        return formMock;
    }

    function deleteForm(id) {
        var form = findFormById(id);
        var idx = formMock.indexOf(user);
        formMock.splice(idx, 1);
        return formMock;
    }

    // returns a single form whose title is equal to title parameter, null otherwise
    function findFormByTitle(title) {
        for (var i in formMock) {
            if (formMock[i].title === title) {
                return formMock[i];
            }
        }
        return null;
    }



}
