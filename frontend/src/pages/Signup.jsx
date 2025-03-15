import React from "react";
import SignupBox from "../components/SignupBox";
import AuthScreen from "../components/Auth/AuthScreen";

const Signup = () => {
  return (
    <AuthScreen>
      <SignupBox />
    </AuthScreen>
  );
};

export default Signup;
