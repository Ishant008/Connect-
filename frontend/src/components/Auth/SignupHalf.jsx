import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { capitalizeName, validateEmail, validateUsername } from "../../config/helping";
import Axios from '../../config/Axios'
import BtnLoader from "../Loaders/BtnLoader";

const SignupHalf = ({setOtpBoxShow,setEmail}) => {
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const nameRef = useRef("")
  const usernameRef = useRef("")
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const handleSubmit=async (e)=>{
    setError("")
    e.preventDefault()
    const fullname = capitalizeName(nameRef.current.value);
    const username = usernameRef.current.value;
    const email = emailRef.current.value.toLowerCase();
    const password = passwordRef.current.value;
    if(!fullname || !username || !email || !password){
      setError("All fields are required")
      return;
    }
    if(!validateUsername(username)){
      setError("Invalid username! Only letters, numbers, and underscore _ are allowed.")
      return;
    }
    if(!validateEmail(email)){
      setError("Invalid email! Enter a valid email address.")
      return;
    }
    if(password.length<6){
      setError("Password must contain atleast 6 characters")
      return;
    }
    setEmail(email)
    setLoading(true)
    let response = await Axios.post('/auth/signup',{fullname,username,email,password})
    setLoading(false)
    if(response.data && response.data.error){
      setError(response.data.message)
      return;
    }
    console.log(response.data)
    setOtpBoxShow(true)
  }
  return (
      <div className="w-full sm:w-[50%] flex flex-col md:p-10 p-4 md:gap-4 gap-3 ">
        <h2 className="md:text-3xl font-semibold text-2xl">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:gap-3 gap-2 text-[17px] ">
          <input ref={nameRef}
            className="md:p-2 p-1 outline-0 w-full border-[1px] border-white focus:bg-gray-800 "
            name="fullname"
            type="text"
            placeholder="Full Name"
          />
          <input ref={usernameRef}
            className="md:p-2 p-1 outline-0 w-full border-[1px] border-white focus:bg-gray-800"
            name="username"
            type="text"
            placeholder="Username"
          />
          <input ref={emailRef}
            className="md:p-2 p-1 outline-0 w-full border-[1px] border-white focus:bg-gray-800"
            name="email"
            type="text"
            placeholder="Email"
          />
          <input ref={passwordRef}
            className="md:p-2 p-1 outline-0 w-full border-[1px] border-white focus:bg-gray-800"
            name="password"
            type="text"
            placeholder="Passowrd"
          />
          {error && <p className="text-red-500 font-btn">{error}</p>}
          
          <div className="flex justify-center">
            <button className="w-[50%] py-1 text-[20px] px-2 border-2 border-white mt-2 rounded hover:bg-white hover:text-primary transition-all duration-200 flex justify-center">
              {loading?<BtnLoader />:"Signup"}
            </button>
          </div>
          <p className="text-center md:text-lg text-md">
            Already have an account?
            <Link to="/login" className="underline ml-1 text-primary">
               Login
            </Link>
          </p>
        </form>
      </div>
  );
};

export default SignupHalf;
