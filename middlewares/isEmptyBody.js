const isEmptyBody = (field = "") => {
  return (req, res, next) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      const error = new Error();
      if (field === "") {
        error.message = "missing fields";
      } else {
        error.message = "missing field favorite";
      }
      error.status = 400;
      next(error);
    }
    next();
  };
};
module.exports = isEmptyBody;
