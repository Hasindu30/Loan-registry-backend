import express from 'express'
import cors from 'cors'
import connectToDatabase from './db/db.js'
import authRouter from './routes/auth.js'
import customerRouter from './routes/customerRoutes.js'
import loanRoutes from './routes/loanRoutes.js'
import loanPaymentRoutes from './routes/loanPaymentRoutes.js'
import chatbotRoutes from './routes/chatbotRoutes.js'
import pdfRoutes from './routes/pdfRoutes.js';

connectToDatabase()
 const app  = express()
 app.use(cors())
 app.use(express.json())
 app.use('/api/auth',authRouter)

 app.use('/api',customerRouter );
  app.use('/api',loanRoutes );
   app.use('/api',loanPaymentRoutes );

   app.use('/api/chatbot', chatbotRoutes);
app.use('/api', pdfRoutes);


 app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
 })

