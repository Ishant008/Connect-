import { LiaHomeSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { useContext, useEffect } from "react";
import { ContextStore } from "../../contextStore/ContextStore";
import LeftProfile from "./LeftProfile";
import SkeletonUserCard from "../Loaders/SkeletonUserCard";
import { NavLink, useLocation } from "react-router";
import { useSelector } from "react-redux";
import socket from "../../config/socket";

const HomeLeft = () => {
  const user = useSelector((store) => store.user);
  const { darkMode, loading, setNotificationDot, notificationDot } =
    useContext(ContextStore);
  const location = useLocation();

  useEffect(() => {
    if (!user) return; 
  
    socket.on("newNotification", ({ to }) => {
      if (to === user._id) {
        setNotificationDot(true);
      }
    });
  
    return () => socket.off("newNotification");
  }, [user]);

  return (
    <div className="w-[20%] lg:w-[17%] min-h-screen hidden md:flex">
      <div className=" flex flex-col items-center justify-between h-full fixed md:w-[20%] lg:w-[15.3%] 2xl:w-[13.6%] py-4">
        <div className="w-full flex flex-col items-center">
          <img
            className="h-[40px] lg:h-[60px]"
            src={darkMode ? "/img/logo-dark.png" : "/img/logo-light.png"}
            alt="Logo"
          />
          <ul className="w-full mt-8 flex flex-col items-center lg:gap-2 gap-4 text-sm lg:text-md font-semibold px-0.5 ">
            <NavLink to="/" className="w-full">
              <li
                className={`lg:grid  lg:grid-cols-[20%_70%] flex flex-col p-2  w-full gap-1 lg:gap-4 items-center cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 ${
                  location.pathname == "/" ? "bg-gray-300 dark:bg-gray-900" : ""
                } `}
              >
                <LiaHomeSolid className="lg:text-3xl text-4xl" />
                <h5>Home</h5>
              </li>
            </NavLink>
            <NavLink to="/notification" className="w-full">
              <li
                className={` lg:grid lg:grid-cols-[20%_70%] flex flex-col  p-2   w-full gap-1 lg:gap-4 items-center cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900
             ${
               location.pathname == "/notification"
                 ? "bg-gray-300 dark:bg-gray-900"
                 : ""
             }  `}
              >
                <div className="relative w-fit h-fit">
                  <IoNotificationsOutline className="lg:text-3xl text-4xl" />
                  {notificationDot && (
                    <div className="w-3 h-3 rounded-full absolute top-0 right-0 bg-red-600"></div>
                  )}
                </div>
                <h5>Notification</h5>
              </li>
            </NavLink>
            <NavLink
              to='/search'
              className="w-full"
            >
              <li
                className={`lg:grid lg:grid-cols-[20%_70%] flex flex-col  p-2  w-full gap-1 lg:gap-4 items-center cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 ${
                  location.pathname == `/search`
                    ? "bg-gray-300 dark:bg-gray-900"
                    : ""
                }`}
              >
                <IoIosSearch className="lg:text-3xl text-4xl" />
                <h5>Search</h5>
              </li>
            </NavLink>
            <NavLink
              to={user.username && `/profile/${user.username}`}
              className="w-full"
            >
              <li
                className={`lg:grid lg:grid-cols-[20%_70%] flex flex-col  p-2  w-full gap-1 lg:gap-4 items-center cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 ${
                  location.pathname == `/profile/${user.username}` ||
                  location.pathname == `/edit-profile/${user.username}`
                    ? "bg-gray-300 dark:bg-gray-900"
                    : ""
                }`}
              >
                <GoPerson className="lg:text-3xl text-4xl" />
                <h5>Profile</h5>
              </li>
            </NavLink>
          </ul>
        </div>
        {loading ? <SkeletonUserCard /> : <LeftProfile />}
      </div>
    </div>
  );
};

export default HomeLeft;
