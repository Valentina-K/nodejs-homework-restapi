const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, schema, isEmptyBody } = require("../../middlewares");
const validateMiddleware = validation(schema);
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateMiddleware, ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", isEmptyBody(), ctrl.updateById);

module.exports = router;
