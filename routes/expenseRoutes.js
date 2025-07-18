import express from 'express';
import { createExpense, deleteExpense, getAllExpenses, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();


router.post('/', createExpense);
router.get('/getAll', getAllExpenses);
router.put('/update/:id', updateExpense);
router.delete('/delete/:id', deleteExpense);

export default router;