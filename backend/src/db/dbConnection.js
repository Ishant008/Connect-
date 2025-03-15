import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const dbConnect = async ()=>{
  try{
    await mongoose.connect(process.env.DB_URI)
  console.log("DB has been connected");
  }catch(err){
    console.log("Some error occured while connecting to db : " , err);
  }
  
}
export default dbConnect

