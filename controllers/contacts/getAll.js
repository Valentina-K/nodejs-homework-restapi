const { Contact } = require("../../models/contact");
const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await Contact.find({ owner });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
