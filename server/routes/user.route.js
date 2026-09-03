import express from 'express'
import { registerUser } from '../constrollers/user.controllers'


const userRoutes= express.Router()

userRoutes.post('/register')

export default userRoutes