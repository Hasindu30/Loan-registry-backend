import express from 'express';
import { createPayment, getPaymentsByCustomer } from '../controllers/loanPaymentController.js';

const router = express.Router();

router.post('/payments',createPayment );
router.get('/allpayments', getPaymentsByCustomer);

export default router;