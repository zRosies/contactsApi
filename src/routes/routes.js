const express= require("express");

const router = express.Router();
const contacts= require('../controlers/contacts');
const swichRoutes= express.Router()

swichRoutes.get('/', contacts.getAllinfo );
swichRoutes.get('/:id', contacts.getSingleId);
swichRoutes.post('/', contacts.createContact);
swichRoutes.delete('/:id', contacts.deleteContact);
swichRoutes.put('/:id', contacts.updateContact)

router.use('/contact', swichRoutes)



module.exports=
    router
;
