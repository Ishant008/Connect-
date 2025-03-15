import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Axios from "../../config/Axios";
import BtnLoader from "../Loaders/BtnLoader";

const LoginHalf =  () => {
  const nav = useNavigate()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const identityRef = useRef("");
  const passwordRef = useRef("");
  const handleSubmit=async(e)=>{
    setError("")
    e.preventDefault();
    const identity = identityRef.current.value;
    const password = passwordRef.current.value;
    if(!identity || !password){
      setError("All fields are required")
    }
    setLoading(true)
    let response = await Axios.post('/auth/login',{identity,password})
    setLoading(false)
    if(response.data.error){
      setError(response.data.message)
    }else{
      nav('/')
    }
  }
  return (
      <div className="w-full sm:w-[50%] flex flex-col md:p-10 p-4 md:gap-4 gap-3 ">
        <h2 className="md:text-3xl font-semibold text-2xl">LOGIN</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:gap-3 gap-2 text-[17px] ">
          <input ref={identityRef}
            className="flex gap-1 p-2 outline-0 w-full border-[1px] border-white focus:bg-gray-800"
            name="identity"
            type="text"
            placeholder="Enter Username or Email"
          />
          <input ref={passwordRef}
            className="p-2 outline-0 w-full border-[1px] border-white focus:bg-gray-800"
            name="password"
            type="password"
            placeholder="Passowrd"
          />
          <NavLink className="text-blue-600 text-right" to='/login/forget-password'>Forget password</NavLink>
          {error && <p className="text-red-600 text-md">{error}</p>}
          <div className="flex justify-center">
            <button className="w-[50%] flex justify-center py-1 text-[20px] px-2 border-2 border-white mt-2 rounded hover:bg-white hover:text-primary transition-all duration-200 ">
              {loading?<BtnLoader/>:"Login"}
            </button>
          </div>
          <p className="text-center md:text-lg text-md">
            Not have an account?
            <Link to="/signup" className="underline ml-1 text-primary">
               Create Account
            </Link>
          </p>
        </form>
      </div>
  );
};

export default LoginHalf;
