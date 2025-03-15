import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  from:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },
  to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },
  type:{
    type:String,
    enum:['follow','like','comment'],
    required:true,
  },
  read:{
    type:Boolean,
    default:false,
  },
},{timestamps:true})

const notificationModal = mongoose.model("notification",notificationSchema)

export default notificationModal;
