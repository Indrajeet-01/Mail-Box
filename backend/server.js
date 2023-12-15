import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/user.js'
import mailRoutes from './routes/mails.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user',userRoutes)
app.use('/mail',mailRoutes)

// database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("DB Connection Successfully"))
.catch((err)=>{
    console.log(err)
})

// server
app.listen(6500, ()=>{
    console.log("server is running!")
})
