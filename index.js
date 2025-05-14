import express from 'express'
import cors from 'cors'
import connectToDatabase from './db/db.js'
import authRouter from './routes/auth.js'
import customerRouter from './routes/customerRoutes.js'

connectToDatabase()
 const app  = express()
 app.use(cors())
 app.use(express.json())
 app.use('/api/auth',authRouter)

 app.use('/api',customerRouter );

 app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
 })

