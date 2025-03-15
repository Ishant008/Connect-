import { BiSolidCommentDetail } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiFireSimpleFill } from "react-icons/pi";
import { BsFillPersonPlusFill } from "react-icons/bs";


const NotificationSpan = ({notification,deleteOne}) => {
  return (
    <div className="flex justify-between border-b-[1px] border-black dark:border-gray-700 p-2">
      <div className="flex gap-2 ">
      <div className="text-[48px]">
        {notification.type=="comment" && <BiSolidCommentDetail color="#178746"/>}
        {notification.type=="like" && <PiFireSimpleFill color="#ff007f"/>}
        {notification.type=="follow" && <BsFillPersonPlusFill color="#4169E1"/>}
      </div>
      <img
        className="w-12 h-12 object-cover rounded-full"
        src={notification.from.profileImg ? notification.from.profileImg : "/img/profile.jpg"}
        alt="profile pic"
      />
      <div>
        <p className="font-semibold">@{notification.from.username}</p>
        {notification.type=="comment" && <p className="font-light">Commented on your post</p>}
        {notification.type=="like" && <p className="font-light">Liked your post</p>}
        {notification.type=="follow" && <p className="font-light">Started following you</p>}
      </div>
    </div>
    <button className="cursor-pointer" onClick={()=>{deleteOne(notification._id)}}><MdOutlineDeleteOutline size={30} /></button>
    </div>
  );
};

export default NotificationSpan;
