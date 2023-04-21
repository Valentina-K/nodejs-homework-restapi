const { Contact } = require("../../models/contact");
const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const filter = favorite ? { owner, favorite } : { owner };
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(filter, "", { skip, limit });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
