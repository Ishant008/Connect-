import React, { useRef, useState } from "react";
import Axios from "../../config/Axios";
import { useNavigate } from "react-router";

const OtpBox = ({email}) => {
  const nav = useNavigate()
  const [error,setError] = useState("")
  const refs = useRef([]);
  const handleInput=(e,index)=>{
    if(e.target.value && index < refs.current.length - 1){
      refs.current[index+1].focus()
    }
  }
  const handleKeyDown = (e,index)=>{
    if(e.key ==="Backspace" && !e.target.value && index>0){
      refs.current[index-1].focus()
    }
  }
  const handlePaste=(e,index)=>{
    let paste = e.clipboardData.getData("text").split("")
    paste.forEach((code,index) => {
      if(refs.current[index]){
        refs.current[index].value = code
      }
    })
  }
  
  const handleSubmit =async(e)=>{
    setError("")
    e.preventDefault()
    let code = ""
    for(let i=0;i<6;i++){
      if(!refs.current[i].value){
        setError("Enter all six digits")
        return
      }
      code += refs.current[i].value
    }
    let response = await Axios.post("/auth/verify-email",{otp:code,email})
    if(response.data && response.data.error){
      setError(response.data.message)
      return
    }
    nav('/')
  }

  return (
    <form onSubmit={handleSubmit} className="text-center min-h-[250px] w-full sm:w-[50%] h-[60%] max-h-[450px]  flex flex-col gap-2 justify-center items-center bg-black">
      <h3 className="md:text-3xl text-xl flex gap-2 ">
        Verify <p className="text-primary">Email</p>
      </h3>
      <p className="md:text-xl text-lg">Your code is sent to you via email</p>
      <div className="flex justify-evenly items-center gap-2"
      onPaste={e=>handlePaste(e)}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              className="bg-gray-800 text-center outline-0 focus:border-white focus:scale-105  focus:border-[1px]  h-10 w-10 text-xl"
              type="text"
              maxLength={1}
              key={index}
              ref={(e)=>refs.current[index]=e}
              onInput={(e)=>handleInput(e,index)}
              onKeyDown={e=>handleKeyDown(e,index)}
            />
          ))}
      </div>
      {error && <p className="text-red-500 font-btn">{error}</p>}
      <div className="w-full flex justify-center item-center">
        <button className="w-[40%] min-w-[120px] lg:w-[30%]  boder-white border-[1px] hover:bg-white hover:text-primary p-2 mt-3">
          Submit OTP
        </button>
      </div>
      <p>Didn't get the code? <button className=" cursor-pointer text-red-600">Resend</button></p>
    </form>
  );
};

export default OtpBox;
