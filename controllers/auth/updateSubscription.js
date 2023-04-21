const { User } = require("../../models/user");
const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.query;
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );
    console.log(result);
    res.status(200).json({
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateSubscription;
