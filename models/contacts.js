const fs = require('fs/promises');
const path = require("path");
const {v4} = require("uuid");

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(filePath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result){
        return null;
    }
    return result;
}

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

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() }
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateIndex = contacts.findIndex(contact => contact.id === contactId);
  if (updateIndex === -1) {
    return null;
  }
  contacts[updateIndex] = { ...body, id:contactId };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[updateIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
