import { useContext, useEffect } from "react"
import { ContextStore } from "../../../contextStore/ContextStore"
import { IoIosMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { LiaHomeSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { NavLink } from "react-router";
import socket from "../../../config/socket";
import { useSelector } from "react-redux";

const ToogleDarkMode = () => {
  const {darkMode,setDarkMode,setNotificationDot, notificationDot} = useContext(ContextStore)
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) return; 
  
    socket.on("newNotification", ({ to }) => {
      if (to === user._id) {
        setNotificationDot(true);
      }
    });
  
    return () => socket.off("newNotification");
  }, [user]);

  const toggleTheme=()=>{
    setDarkMode(!darkMode)
    localStorage.setItem("dark",JSON.stringify(!darkMode))
  }
  return (
    <ul className="fixed z-10 h-[50px] w-full md:w-[79.78%] lg:w-[50.28%] 2xl:w-[44.5%] border-b-[1px] bg-white dark:bg-black border-black dark:border-gray-700 flex justify-around md:justify-center items-center text-4xl transition-colors duration-400">
      <li className="w-fit px-2 hover:bg-gray-300 hover:dark:bg-white/10 h-full flex md:hidden items-center ">
        <NavLink to='/' >
        <LiaHomeSolid />
        </NavLink>
      </li>
      <li className="w-fit px-2 hover:bg-gray-300 hover:dark:bg-white/10 h-full flex md:hidden items-center relative">
        <NavLink to='/notification' >
        <IoNotificationsOutline />
        {notificationDot && (
                    <div className="w-3 h-3 rounded-full absolute top-1 right-1 bg-red-600"></div>
                  )}
        </NavLink>
      </li>
      <li className="w-fit px-2 hover:bg-gray-300 hover:dark:bg-white/10 h-full flex md:hidden items-center ">
        <NavLink to='/search' >
        <IoIosSearch />
        </NavLink>
      </li>
      <li className="w-fit px-2 hover:bg-gray-300 hover:dark:bg-white/10 h-full flex md:hidden items-center ">
        <NavLink to={`/profile/${user.username}`} >
        <GoPerson />
        </NavLink>
      </li>
      <li className="flex items-center"><button onClick={toggleTheme} className="cursor-pointer">
      {darkMode?<IoIosMoon />:<IoSunny />}
      </button></li>
    </ul>
  )
}

export default ToogleDarkMode
