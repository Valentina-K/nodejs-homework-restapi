const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const {
  validation,
  isEmptyBody,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const validateMiddleware = validation(schemas.addSchema);
const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId(), ctrl.getContactById);

router.post("/", authenticate, validateMiddleware, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId(), ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId(),
  isEmptyBody(),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId(),
  isEmptyBody("favorite"),
  validation(schemas.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
