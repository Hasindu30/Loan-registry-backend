import express from 'express';
import { generateLoanSummaryPdf } from '../controllers/loanPdfController.js';

const router = express.Router();

router.get('/loan-summary-pdf', generateLoanSummaryPdf);

export default router;
