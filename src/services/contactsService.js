const Contact = require('../schemas/contactsModel');
const { WrongIdError } = require('../helpers/errors');

const getContacts = async (userId, { page = 0, perPage = 5 }) => {
  const contacts = await Contact.find({ owner: userId })
    .populate({
      path: 'owner',
      select: 'email subscription',
    })
    .limit(+perPage)
    .skip(+page * +perPage);
  return contacts;
};

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });

  if (!contact) {
    throw new WrongIdError(`Fail, no contacts with id ${contactId}`);
  }
  return contact;
};

const addContact = async (userId, body) => {
  const newContact = await Contact.create({ ...body, owner: userId });
  return newContact;
};

const updateContact = async (userId, contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    {
      new: true,
    },
  );
  return contact;
};

const updateContactStatus = async (userId, contactId, { favorite }) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    { new: true },
  );
  return contact;
};

const deleteContact = async (userId, contactId) => {
  await Contact.findByIdAndRemove({ _id: contactId, owner: userId });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
