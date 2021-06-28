const express = require('express');
const router = new express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require('../../middlewares/contactValidation.js');

const { asyncWrapper } = require('../../helpers/apiHelpers');

const {
  getContactsController,
  getContactsByIdController,
  addContactController,
  updateContactController,
  updateContactStatusController,
  deleteContactController,
} = require('../../controllers/contactsController.js');

const { guard } = require('../../helpers/guard');

router.use(guard);

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactsByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.delete('/:contactId', asyncWrapper(deleteContactController));
router.patch(
  '/:contactId',
  updateContactValidation,
  asyncWrapper(updateContactController),
);
router.patch(
  '/:contactId/favorite',
  updateContactStatusValidation,
  asyncWrapper(updateContactStatusController),
);

module.exports = router;
