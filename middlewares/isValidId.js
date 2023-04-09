const { isValidObjectId } = require("mongoose");
const isValidId = (res, req, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(`${id} is not valid id`);
  }
  next();
};

module.exports = isValidId;
