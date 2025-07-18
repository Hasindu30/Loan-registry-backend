
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();


import express from 'express';
import cors from 'cors';
import connectToDatabase from './db/db.js';
import authRouter from './routes/auth.js';
import customerRouter from './routes/customerRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import loanPaymentRoutes from './routes/loanPaymentRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import pdfRoutes from './routes/pdfRoutes.js';
import expenseRoute from './routes/expenseRoutes.js'
import incomeRoute from './routes/incomeRoutes.js'
import budgetSummaryRoute from './routes/budgetSummaryRoutes.js'



connectToDatabase();


const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://loan-registry-frontend.vercel.app',
  'http://56.228.24.153:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', customerRouter);
app.use('/api', loanRoutes);
app.use('/api', loanPaymentRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api', pdfRoutes);
app.use('/api/expenses', expenseRoute); 
app.use('/api/income',incomeRoute ); 
app.use('/api/budget',budgetSummaryRoute ); 


app.listen(process.env.PORT || 3000, () => {
  console.log(` Server is running on port ${process.env.PORT}`);
});
