const operations = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: "contact deleted",
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
}

module.exports = removeContact;