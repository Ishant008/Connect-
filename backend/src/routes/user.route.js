import express from 'express'
import { deleteImg, followUser, getMe, getProfile, search, suggestions, updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const userRoute = express.Router()

userRoute.get('/profile/:username',getProfile)
userRoute.put('/follow/:username',protectRoute,followUser)
userRoute.get('/suggestions',protectRoute,suggestions)
userRoute.get('/get-me',protectRoute,getMe)
userRoute.put('/update-profile',protectRoute,updateProfile)
userRoute.put('/delete-image',protectRoute,deleteImg)
userRoute.post('/search',protectRoute,search)


export default userRoute;