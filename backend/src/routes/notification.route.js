import express from "express"
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const notificationRoute = express.Router()

notificationRoute.get("/get-all",protectRoute,getNotifications)
notificationRoute.delete("/delete/:notificationID?",protectRoute,deleteNotifications)


export default notificationRoute;