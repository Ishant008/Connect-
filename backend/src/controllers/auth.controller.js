import { resetEmail, verifyEmail } from "../config/emailTemplate.js";
import transporter from "../config/nodemailer.js";
import tokenSign from "../config/tokenSign.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    if (!fullname || !username || !email || !password) {
      return res.json({
        error: true,
        message: "All fields are required",
      });
    }
    let existUser = await userModel.findOne({ email });
    if (existUser && !existUser.isVerified) {
      return await userModel.deleteOne({ email });
    }
    let userUserName = await userModel.findOne({ username });
    if (userUserName) {
      return res.json({
        error: true,
        message: "Username already exist",
      });
    }
    let userEmail = await userModel.findOne({ email });
    if (userEmail) {
      return res.json({
        error: true,
        message: "Email already exist",
      });
    }
    if (password.length < 6) {
      return res.json({
        error: true,
        message: "Password must be atleast 6 characters long",
      });
    }

    let otp = Math.floor(100000 + Math.random() * 900000);

    let emailHTML = verifyEmail(otp);

    let emailMessage = {
      from: '"Connect Team" <castleapp000@gmail.com>',
      to: email,
      subject: "Verify Email",
      html: emailHTML,
    };

    await transporter.sendMail(emailMessage);

    const hashPassword = await bcrypt.hash(password, 10);
    let user = new userModel({
      fullname,
      username,
      email,
      password: hashPassword,
      verifyCode: otp,
      verifyTime: Date.now() + 16 * 60 * 1000,
    });
    await user.save();
    return res.status(200).json({
      error: false,
      message: "User has been created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Some Internal error",
      err: err.message,
    });
  }
};

export const verify = async (req, res) => {
  let { otp,email } = req.body;

  try {
    if (!email || !otp) {
      return res.json({
        error: true,
        message: "Email and otp are required",
      });
    }
    let existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.json({
        error: true,
        message: "email doesn't exist",
      });
    }
    if (existUser.isVerified) {
      return res.json({
        error: true,
        message: "User is already verified",
      });
    }
    if (existUser.verifyCode != otp) {
      return res.json({
        error: true,
        message: "Verification code is invalid",
      });
    } else if (existUser.verifyTime < Date.now()) {
      return res.json({
        error: true,
        message: "Verification code has been expired",
      });
    }

    let token = tokenSign(existUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
       sameSite: "None",
    });

    existUser.isVerified = true;
    existUser.verifyTime = undefined;
    existUser.verifyCode = undefined;
    existUser.save();

    return res.status(200).json({
      error: false,
      message: "User verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: false,
      message: "Some Internal Error",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { identity, password } = req.body;

  try {
    if (!identity || !password) {
      return res.json({
        error: true,
        message: "All fiels are required",
      });
    }
    let user = await userModel.findOne({
      $or: [{ username: identity }, { email: identity.toLowerCase() }],
    });
    if (!user) {
      return res.json({
        error: true,
        message: "User doesn't Exist",
      });
    } else if (!user.isVerified) {
      return res.json({
        error: true,
        message: "User is not verified",
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        error: true,
        message: "Invalid password",
      });
    }

    let token = tokenSign(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
       sameSite: "None",
    });

    return res.json({
      error: false,
      message: "Login Successfull",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      error: error.message,
    });
  }
};

export const sendresetCode = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.json({
        error: true,
        message: "Email is required",
      });
    }
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        error: true,
        message: "Email doesn't exist",
      });
    }
    let otp = Math.floor(100000 + Math.random() * 900000);
    let emailHTML = resetEmail(otp);

    let emailMessage = {
      from: '"Connect Team" <castleapp000@gmail.com>',
      to: email,
      subject: "Reset Password",
      html: emailHTML,
    };

    await transporter.sendMail(emailMessage);
    user.resetCode = otp;
    user.resetTime = Date.now() + 16 * 60 * 1000;

    await user.save();
    return res.status(200).json({
      error: false,
      message: "Otp has been sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      eror: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email,otp, password } = req.body;

  try {
    if (!email || !otp || !password) {
      return res.json({
        error: true,
        message: "All fields are required",
      });
    }
    let user = await userModel.findOne({ email });
    let isMatch = await bcrypt.compare(password,user.password);
    if (!user) {
      return res.json({
        error: true,
        message: "User doesn't exist",
      });
    }
    if (user.resetCode != otp) {
      return res.json({
        error: true,
        message: "Invalid verification code",
      });
    } else if (user.resetTime < Date.now()) {
      return res.json({
        error: true,
        message: "Verification code has been expired",
      });
    } else if (isMatch) {
      return res.json({
        error: true,
        message: "Please enter the new password",
      });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    user.resetCode = undefined;
    user.resetTime = undefined;
    await user.save();

    return res.status(200).json({
      error: false,
      message: "Password has been reset",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      error: error.message,
    });
  }
};

export const logout = async (req,res)=>{
  try{
   res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
   res.status(200).json({
    error:false,
    message:"User logged out successfully"
   })
  }catch(err){
    res.status(500).json({
      error:true,
      message:"Some Internal Error",
      err:err.message,
    })
  }
}

export const authorizeCheck = async (req,res)=>{
  const {id} = req
  if(id){
    return res.json({
      authorize:true
    })
  }
  else{
    return res.json({
      authorize:false
    })
  }
}
