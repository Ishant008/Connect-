import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  verifyCode: {
    type: Number,
  },
  verifyTime: {
    type: Date,
  },
  resetCode: {
    type: Number,
  },
  resetTime: {
    type: Date,
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  profileImg: {
    type: String,
  },
  profileID: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  coverID: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const userModel = mongoose.model("user", schema);
export default userModel;
