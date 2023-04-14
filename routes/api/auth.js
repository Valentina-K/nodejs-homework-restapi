const express = require("express");
const { schemas } = require("../../models/user");
const { validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", validation(schemas.authSchema), ctrl.register);
router.post("/login", validation(schemas.authSchema), ctrl.login);

module.exports = router;
