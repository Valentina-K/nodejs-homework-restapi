const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const validation = require('../../middlewares/validation');
const schema = require('../../middlewares/schema');
const validateMiddleware = validation(schema);
const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateMiddleware, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateMiddleware, ctrl.updateById);

module.exports = router
