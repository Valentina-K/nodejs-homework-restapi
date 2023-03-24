const operations = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  try {
    if (req.body.constructor===Object && Object.keys(req.body).length===0) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }
    /* const isEmpty = !Object.keys(req.body).length;
    if (isEmpty) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    } */
    const { contactId } = req.params;
    const result = await operations.updateContact(contactId, req.body);
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

module.exports = updateContact;