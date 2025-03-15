import React, { useState } from "react";
import AuthContainer from "./Auth/AuthContainer";
import LogoHalf from "./Auth/LogoHalf";
import SignupHalf from "./Auth/SignupHalf";
import OtpBox from "./Auth/OtpBox";

const SignupBox = () => {
  const [otpBoxShow,setOtpBoxShow] = useState(false)
  let [email,setEmail] = useState("")
  return (
    <AuthContainer >
      <LogoHalf />
      {otpBoxShow?<OtpBox email={email} />:<SignupHalf setEmail={setEmail} setOtpBoxShow={setOtpBoxShow} />}
    </AuthContainer>
  );
};

export default SignupBox;
