const { isValidObjectId } = require("mongoose");
const isValidId = () => {
  return (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    }
    next();
  };
};

module.exports = isValidId;
