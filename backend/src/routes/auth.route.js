import express from 'express'
import { authorizeCheck, login, logout, resetPassword, sendresetCode, signup, verify } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/protectRoute.js'

const authRoute = express.Router()

authRoute.post("/signup",signup)
authRoute.post("/verify-email",verify)
authRoute.post("/login",login)
authRoute.post("/send-reset-code",sendresetCode)
authRoute.post("/reset-password",resetPassword)
authRoute.get("/logout",logout)
authRoute.get("/authorize-check",protectRoute,authorizeCheck)

export default authRoute