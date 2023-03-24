const operations = require('../../models/contacts');
const listContacts = async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
        res.json(contacts);
  } catch (error) {
    next(error);
  }
  
}

module.exports = listContacts;