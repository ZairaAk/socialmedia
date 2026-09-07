import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser'
dotenv.config() //tells the dotenv package to read your .env file and load those values into Node’s process.env.

const app = express()  //here we made a server
const Port = 8085

mongoose.connect(process.env.DB_URL).then(()=>{    
    console.log("DB connected")

}).catch((err)=>{       
    console.log(err)

})

app.use(express.json())
app.use(cookieParser())



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