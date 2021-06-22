const express = require('express');
const router = new express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require('../../middlewares/validation.js');

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

router.get('/', guard, asyncWrapper(getContactsController));
router.get('/:contactId', guard, asyncWrapper(getContactsByIdController));
router.post(
  '/',
  addContactValidation,
  guard,
  asyncWrapper(addContactController),
);
router.delete('/:contactId', guard, asyncWrapper(deleteContactController));
router.patch(
  '/:contactId',
  guard,
  updateContactValidation,
  asyncWrapper(updateContactController),
);
router.patch(
  '/:contactId/favorite',
  guard,
  updateContactStatusValidation,
  asyncWrapper(updateContactStatusController),
);

module.exports = router;
