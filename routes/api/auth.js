const express = require("express");
const { schemas } = require("../../models/user");
const { validation } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validation(schemas.registerSchema), ctrl.register);

module.exports = router;
