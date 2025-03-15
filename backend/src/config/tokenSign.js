import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()

const tokenSign = (id)=>{
  let token = jwt.sign({id},process.env.SECRET_TOKEN,{
    expiresIn:'7d'
  })
  return token;
}
export default tokenSign;