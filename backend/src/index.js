// 
import express from 'express'
import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {Server} from 'socket.io'

// 
import dbConnect from './db/dbConnection.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js';
import notificationRoute from './routes/notification.route.js';
// 

dotenv.config()


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
})

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
  });
});


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}))
app.use(express.json({ limit: "80mb" })); 
app.use(express.urlencoded({ limit: "80mb", extended: true })); 
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/notification',notificationRoute)

const port = process.env.PORT || 8000

server.listen(port,()=>{
  console.log("Server started on Port:http://localhost:8000")
  dbConnect()
})