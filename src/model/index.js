const fs = require('fs/promises');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve(__dirname, './contacts.json');

const readContactsFile = async contacts => {
  const data = await fs.readFile(contacts, 'utf8');
  return JSON.parse(data);
};

const listContacts = async () => {
  try {
    return await readContactsFile(contactsPath);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await readContactsFile(contactsPath);

    const contactById = contacts.some(contact => contactId === contact.id)
      ? contacts.find(contact => contactId === contact.id)
      : null;
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await readContactsFile(contactsPath);
    if (contacts.some(contact => contactId === contact.id)) {
      const newContacts = contacts.filter(contact => contact.id !== contactId);

      await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, '\t'));

      return newContacts;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async body => {
  const { name, email, phone } = body;
  const contactToAdd = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await readContactsFile(contactsPath);

    const newContacts = [...contacts, contactToAdd];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, '\t'));

    return contactToAdd
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContactsFile(contactsPath);

    let currentContact = null;

    const newContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        const updatedContact = { ...contact, ...body };
        currentContact = updatedContact;
        return updatedContact;
      }
      return contact;
    });

    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, '\t'));

    return currentContact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
