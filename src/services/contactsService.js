const { Contact } = require('../schemas/contactsModel');
const { WrongIdError } = require('../helpers/errors');

const getContacts = async userId => {
  const contacts = await Contact.find({ userId });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });

  if (!contact) {
    throw new WrongIdError(`fail, no contacts with id ${contactId}`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, userId) => {
  const newContact = new Contact({ name, email, phone, favorite, userId });
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId, userId }, body, {
    new: true,
  });
  return contact;
};

const updateContactStatus = async (contactId, { favorite }, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    {_id: contactId, userId},
    { favorite },
    { new: true },
  );
  return contact;
};

const deleteContact = async (contactId, userId) => {
  await Contact.findByIdAndRemove({ _id: contactId, userId });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
