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
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers'}),
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
    
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) { }
    res.json({ status: "success", code: 200, data: result});
  } catch (error) {
    
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body);
        if(error){
            error.status = 400;
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
    
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
