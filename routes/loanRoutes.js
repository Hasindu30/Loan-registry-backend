import express from 'express';
import { createLoan, deleteLoan, getAllLoans, updateLoan } from '../controllers/loanSummaryController.js';


const router = express.Router();

router.post('/loans', createLoan);
router.get('/allloans', getAllLoans);
router.put('/loanUpdate/:id', updateLoan);
router.delete('/loanDelete/:id', deleteLoan);

export default router;