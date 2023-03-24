const listContacts = require("./getAll");
const getContactById = require("./getById");
const addContact = require("./add");
const updateContact = require("./updateById");
const removeContact = require("./remove");

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact
}