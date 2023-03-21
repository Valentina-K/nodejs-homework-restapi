const express = require('express')
const Joi = require('joi');
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,} = require('../../models/contacts');

const router = express.Router()
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, data: result});
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body);
        if(error){
          error.status = 400;
          error.message = 'missing required name field';
          throw error;
    }
    const result = await addContact(req.body);
    res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        })
  } catch (error) {
    next(error);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status:"success",
      message: "contact deleted",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body);
    if(error){
      error.status = 400;
      error.message = `missing fields`;
      throw error;
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    res.json({
      status: "success",
      code: 200,
      data: result
})
  } catch (error) {
    next(error);
  }
})

module.exports = router
