const express = require("express");
const { schemas } = require("../../models/user");
const { validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validation(schemas.authSchema), ctrl.register);
router.post("/login", validation(schemas.authSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);
router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
