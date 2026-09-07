import express from 'express'
import { getMe, registerUser } from '../controllers/user.controllers.js'
import { loginUser } from '../controllers/user.controllers.js'
import { isAuthenticated } from '../middlewares/authMiddlewear.js'


const userRoutes = express.Router()

userRoutes.post('/register',registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/me',isAuthenticated,getMe
)

export default userRoutes