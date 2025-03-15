import { SlLogout } from "react-icons/sl";
import { useSelector } from "react-redux";
import Axios from "../../config/Axios";
import { useNavigate } from "react-router";

const LeftProfile = () => {
  const nav = useNavigate()
  const user = useSelector(store=>store.user)
  const logout=async()=>{
    let response = await Axios.get('/auth/logout')
    if(response.data && !response.data.error){
      nav('/login')
    }
  }
  
  return (
    
    <div className="w-full flex md:flex-col lg:flex-row items-center justify-around px-0.5">
      <img
        className="hidden lg:block w-10 h-10 object-cover rounded-full "
        src={user.profileImg ? user.profileImg : "/img/profile.jpg"}
        alt=""
      />
      <div className="w-[50%] hidden lg:block">
        <h6 className="text-sm line-clamp-1 ">{user.fullname}</h6>
        <p className="text-xs 2xl:text-sm line-clamp-1 font-light dark:text-white/50">@{user.username}</p>
      </div>
      <div onClick={logout} className="h-fit w-fit p-1.5 flex justify-center items-center cursor-pointer">
        <SlLogout className="lg:text-xl text-2xl" />
      </div>
      <p className="text-lg lg:hidden">Logout</p>
    </div>
  );
};

export default LeftProfile;
