import React, { useContext, useEffect } from "react";
import HomeLeft from "../components/Home/HomeLeft";
import HomeRight from "../components/Home/HomeRight";
import { Outlet } from "react-router";
import ToogleDarkMode from "../components/Home/HomeMain/ToogleDarkMode";
import Axios from "../config/Axios";
import { userAction } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { ContextStore } from "../contextStore/ContextStore";

const Home = () => {
  const {setLoading} = useContext(ContextStore)
  const dispatch = useDispatch()
  const UserFetch = async () => {
    setLoading(true)
    const response = await Axios.get("/user/get-me")
    setLoading(false)
    if(!response.data.error ){
      dispatch(userAction.getMe(response.data.user))
    }else{
      console.log(response.data.message);
    }
  };
  useEffect(()=>{
    UserFetch()
  },[])
  
  return (
    <main className="w-full lg:w-[90%] 2xl:w-[80%] min-h-screen flex justify-center">
      <HomeLeft />
      <div className="w-full border-x-[1px] border-black dark:border-gray-700 md:w-[80%] lg:w-[56%] font-btn relative">
        <ToogleDarkMode />
        <Outlet />
      </div>
      <HomeRight />
    </main>
  );
};

export default Home;
