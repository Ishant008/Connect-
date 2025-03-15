import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const protectRoute = async (req,res,next)=>{
  try{
    const {token} = req.cookies
    
    if(!token){
      return res.json({
        error:true,
        message:"Token is required"
      })
    }
    let decoded = jwt.verify(token,process.env.SECRET_TOKEN)
    if(!decoded){
      return res.json({
        error:true,
        message:"Token is invalid"
      })
    }
    req.id = decoded.id
  next()
  }catch(err){
    return res.status(500).json({
      error:true,
      message:"Some Internal Error",
      err:err.message
    })
  }
  
}