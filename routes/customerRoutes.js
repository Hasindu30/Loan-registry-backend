import express from 'express'
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from '../controllers/customerController.js';


const router = express.Router();


router.post('/customer', createCustomer);        
router.get('/allcustomer', getAllCustomers);       
router.put('/customerUpdate/:id', updateCustomer); 
router.delete('/customerDelete/:id', deleteCustomer);

export default router;
