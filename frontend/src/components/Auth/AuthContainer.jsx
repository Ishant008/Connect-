import React from "react";

const AuthContainer = ({ children}) => {
  return (
    <div
      className={`flex w-[80%] lg:w-[70%] flex-wrap  `}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
