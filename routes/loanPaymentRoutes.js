import express from 'express';
import { createPayment, deletePayment, getPaymentsByCustomer, updatePayment } from '../controllers/loanPaymentController.js';

const router = express.Router();

router.post('/payments',createPayment );
router.get('/allpayments', getPaymentsByCustomer);
router.put('/paymentUpdate/:id', updatePayment);
router.delete('/paymentDelete/:id', deletePayment);
export default router;