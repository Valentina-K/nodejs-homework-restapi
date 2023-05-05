const express = require("express");
const { schemas } = require("../../models/user");
const { validation, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { authenticate,verifyEmail } = require("../../middlewares");

const router = express.Router();

router.post("/register", validation(schemas.authSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verify);
router.post("/verify",validation(schemas.verifyEmailSchema), ctrl.resendEmail);
router.post("/login", validation(schemas.authSchema), verifyEmail, ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);
router.patch("/", authenticate, ctrl.updateSubscription);
router.patch("/avatars", authenticate, upload.single("avatarURL"), ctrl.updateAvatar);


module.exports = router;
