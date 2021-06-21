const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts });
};

const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  res.status(200).json({ contact, status: 'success' });
};

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(201).json({ contact, status: 'success' });
};


const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  res.status(200).json({ contact, status: 'success' });
};

const updateContactStatusController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContactStatusController(contactId, req.body);
  res.status(200).json({ contact, status: 'success' });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContact(contactId);
  res.status(200).json({ status: 'success' });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactController,
  updateContactController,
  updateContactStatusController,
  deleteContactController,
};
