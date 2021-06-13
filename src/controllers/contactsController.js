const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index.js');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: 'success' });
  } catch (error) {
    next(error);
  }
};

const getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      return res.status(400).json({ message: 'Contact not found' });
    }

    res.status(200).json({ contact, status: 'success' });
  } catch (error) {
    next(error);
  }
};

const addContacts = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    res.status(201).json({ contact, status: 'success' });
  } catch (error) {
    next(error);
  }
};

const updateContacts = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) {
      return res.status(400).json({ message: 'Contact not found' });
    }

    res.status(200).json({ contact, status: 'success' });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactToDelete = await removeContact(req.params.contactId);

    if (!contactToDelete) {
      return res.status(400).json({ message: 'Contact not found' });
    }

    res.status(200).json({ status: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  updateContacts,
  deleteContact,
};
