import notificationModal from "../models/notification.modal.js"


export const getNotifications = async (req,res)=>{
  const {id} = req
  try {
    let notifications = await notificationModal.find({to:id}).sort({createdAt:-1}).populate({
      path:"from",
      select:"username profileImg"
    })
    await notificationModal.updateMany({to:id},{read:true})
    return res.status(200).json({
      error:false,
      notifications
    })
  } catch (error) {
    return res.status(500).json({
      error:true,
      message:"Some Internal Error",
      err:error
    })
  }
}

export const deleteNotifications= async(req,res)=>{
  const {id}= req
  const {notificationID} = req.params
  try {
    if(notificationID){
      await notificationModal.findByIdAndDelete(notificationID)
      return res.status(200).json({
        error:false,
        message:"Notification is deleted"
      })
    }
    await notificationModal.deleteMany({to:id})
    return res.status(200).json({
      error:false,
      message:"All notifications are deleted"
    })
  } catch (error) {
    return res.status(500).json({
      error:true,
      message:"Some Internal Error",
      err:error
    })
  }
}