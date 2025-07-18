import express from 'express';
import { createIncome, deleteIncome, getAllIncomes, updateIncome } from '../controllers/incomeController.js';

const router = express.Router();


router.post('/', createIncome);
router.get('/getAll', getAllIncomes);
router.put('/update/:id', updateIncome);
router.delete('/delete/:id', deleteIncome);

export default router;