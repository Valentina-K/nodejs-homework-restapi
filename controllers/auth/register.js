const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const HttpError = require("../../helpers/httperror");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
      /* const error = new Error("Email in use");
      error.status = 409;
      throw error; */
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ ...req.body, password: hashPassword });
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
