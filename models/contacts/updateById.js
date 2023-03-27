const fs = require("fs/promises");
const filePath = require("./filePath");
const listContacts = require("./getAll");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (updateIndex === -1) {
    return null;
  }
  contacts[updateIndex] = { ...contacts[updateIndex], ...body, id: contactId };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[updateIndex];
};

module.exports = updateContact;
