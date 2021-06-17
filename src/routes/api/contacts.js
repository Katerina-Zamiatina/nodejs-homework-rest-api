const express = require('express');
const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/validation.js');

const {
  getContacts,
  getContactsById,
  addContacts,
  updateContacts,
  deleteContact,
} = require('../../controllers/contactsController.js');

router.get('/', getContacts);
router.get('/:contactId', getContactsById);
router.post('/', addContactValidation, addContacts);
router.delete('/:contactId', deleteContact);
router.patch('/:contactId', updateContactValidation, updateContacts);

module.exports = router;
