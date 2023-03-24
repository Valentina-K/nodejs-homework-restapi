const fs = require("fs/promises");
const listContacts = require('./getAll');
const filePath = require("./filePath");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deleteIndex = contacts.findIndex(contact => contact.id === contactId);
  if (deleteIndex === -1) {
    return null;
  }
  
  const newContacts = contacts.filter((_,index) => index !== deleteIndex);
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return contacts[deleteIndex];
}

module.exports = removeContact;