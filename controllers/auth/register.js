const { User } = require("../../models/user");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }
    const result = await User.create(req.body);
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
