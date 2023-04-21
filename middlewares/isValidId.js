const HttpError = require("../helpers/httperror");
const { isValidObjectId } = require("mongoose");
const isValidId = () => {
  return (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {      
      next(HttpError(404, "Not found"));
    }
    next();
  };
};

module.exports = isValidId;
