import { useContext, useEffect, useState } from "react";
import NotificationSpan from "../components/NotificationSpan"
import { MdOutlineDeleteSweep } from "react-icons/md";
import Axios from "../config/Axios";
import NotificationSkeleton from "../components/Loaders/NotificationSkeleton";
import { ContextStore } from "../contextStore/ContextStore";

const Notification = () => {
  const { setNotificationDot } = useContext(ContextStore)
  const [loading,setLoading] = useState(true)
  const [notifications,setNotification] = useState([])
  useEffect(()=>{
    Axios.get('/notification/get-all').then((res)=>{
      if(!res.data.error){
        setNotificationDot(false)
        setLoading(false)
        setNotification(res.data.notifications)
      }
    })
  },[])
  const deleteAll =()=>{
    Axios.delete('/notification/delete')
    setNotification([])
  }
  const deleteOne=(id)=>{
    Axios.delete(`/notification/delete/${id}`)
    setNotification((prev)=>{
      prev.filter((noti)=>noti._id!=id)
    })
  }
  return (
    <div className='mt-[50px]'>
      <div className=" py-2 relative font-semibold text-xl flex items-center justify-center border-b-[1px] border-black dark:border-gray-700">Notifications
        <button onClick={deleteAll} className="absolute right-1 cursor-pointer"><MdOutlineDeleteSweep size={34} /></button>
      </div>
      {
      loading ? <NotificationSkeleton /> : ( notifications && notifications.map((notification,index)=>(
        <NotificationSpan deleteOne={deleteOne} key={index} notification={notification} />
      )))}
    </div>
  )
}

export default Notification
