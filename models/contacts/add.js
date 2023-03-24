const fs = require('fs/promises');
const { v4 } = require("uuid");
const listContacts = require('./getAll');
const filePath = require("./filePath");

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() }
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}
module.exports = addContact;