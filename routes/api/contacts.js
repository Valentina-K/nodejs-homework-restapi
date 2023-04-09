const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, isEmptyBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const validateMiddleware = validation(schemas.addSchema);
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateMiddleware, ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, isEmptyBody(), ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody(),
  validation(schemas.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
