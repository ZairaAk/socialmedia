//register controller
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import genToken from '../utils/generateToken.js'

const cookieOptions= {
    httpOnly : true 

}


export const registerUser= async(req,res)=>{


    try{

        const {name,username,email,password}=req.body

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'All fileds Required' })
        }

        if (password.length <= 6) {
            return res.status(400).json({ message: 'Password should be greater than 6 characters' })
        }

        const userExists = await User.findOne({ username })

        if (userExists) {
            return res.status(409).json({ message: 'User Already Exists' })
        }
 

        const emailExists = await User.findOne({ email }) //is it User bcz we named it

        if (emailExists) {
            return res.status(409).json({ message: 'User Already Exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser= await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })
        const token =genToken(newUser.id) //id??
        res.cookies('token', token,cookieOptions)

 
    }catch(err){
        res.status(500).json({ message: 'Server crashed', error: error.message })
    }
       


}


export const loginUser = async(req,res)=>{  //why use aync

    try{
        const {email,password} = req.body 

        if (!email || !password) {
            return res.status(400).json({ message: 'All fileds Required' })
        }

        
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User Does Not Exists' })
        }
        const passwordMatched= await bcrypt.compare(password,user.password)
        console.log(passwordMatched)

        res.status(200).json({message: 'User Logged In'})

    }catch(err){
        res.status(500).json({ message: 'Server crashed', error: error.message })

    }

}

export const getMe = (req,res)=>{
    const authenticatedUser = req.user
    res.status(200).json({authenticatedUser})

}