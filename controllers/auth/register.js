const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const {HttpError, sendEmail} = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const {BASE_URL} = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    const result = await User.create({
       ...req.body, 
       password: hashPassword, 
       avatarURL, 
       verificationToken
     });

      const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
