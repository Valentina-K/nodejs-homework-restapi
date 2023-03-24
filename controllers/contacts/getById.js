const operations = require('../../models/contacts');
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getContactById; 