const listContacts = require("./getAll");
const getContactById = require("./getById");
const removeContact = require("./remove");
const updateById = require("./upgateById");
const addContact = require("./add");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateById,
  addContact,
  updateStatusContact,
};
