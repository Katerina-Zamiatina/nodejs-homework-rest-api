const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
  const { page, perPage } = req.query;
  console.log('page', page);
  console.log('perpage', perPage);

  const contacts = await getContacts(req.user.id, { page, perPage });

  res
    .status(200)
    .json({ contacts, pagination: { page, perPage }, status: 'success' });
};

const getContactsByIdController = async (req, res) => {
  const contact = await getContactById(req.user.id, req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};

const addContactController = async (req, res) => {
  const contact = await addContact(req.user.id, req.body);

  res.status(201).json({ contact, status: 'success' });
};

const updateContactController = async (req, res) => {
  const contact = await updateContact(
    req.user.id,
    req.params.contactId,
    req.body,
  );
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ contact, status: 'success' });
};

const updateContactStatusController = async (req, res) => {
  const contact = await updateContactStatus(
    req.user.id,
    req.params.contactId,
    req.body,
  );
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ contact, status: 'success' });
};

const deleteContactController = async (req, res) => {
  const result = await deleteContact(req.user.id, req.params.contactId);

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ message: 'Contact succefully deleted' });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactController,
  updateContactController,
  updateContactStatusController,
  deleteContactController,
};
