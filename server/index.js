import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config() //tells the dotenv package to read your .env file and load those values into Node’s process.env.

const app = express()  //here we made a server
const Port =8085
mongoose.connect(process.env.dbUrl).then(()=>{
        console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json())

app.use('/users',userRoutes)

app.get('/',(req,res)=>{
    res.send('hellloo')
})
app.get('/s',(req,res)=>{
    res.send('sss')
})

app.listen(Port,()=>{
    console.log(`server started at ${Port}`)
})