const { Contact } = require('../schemas/contactsModel');
const { WrongIdError } = require('../helpers/errors');

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async contactId => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new WrongIdError(`fail, no contacts with id ${contactId}`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const newContact = await Contact.create({ name, email, phone, favorite });
  return newContact;
};


const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return contact;
};

const updateContactStatus = async (contactId, { favorite }) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true },
  );
  return contact;
};

const deleteContact = async contactId => {
  await Contact.findByIdAndRemove(contactId);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
