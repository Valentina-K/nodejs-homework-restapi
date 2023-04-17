const { User } = require("../../models/user");
const HttpError = require("../../helpers/httperror");

const logout = async (req, res, next) => {
  try {
    const { user } = req.user;
    const token = null;
    const result = await User.findByIdAndUpdate(user._id, token, {
      new: true,
    });
    if (!result) {
      next(HttpError(401, "Not authorized"));
    }
    res.status(204);
    next();
  } catch {}
};
module.exports = logout;
