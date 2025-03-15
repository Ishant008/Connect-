import React from "react";

const LogoHalf = ({className}) => {
  return (
    <div className={`${className} md:text-3xl text-2xl flex-col  my-10 sm:m-0 w-[90vw] sm:w-[50%] flex justify-center items-center`}>
      <img className="sm:w-[200px] w-[140px]" src="img/logo-dark.png" alt="Logo" />
      CONNECT
    </div>
  );
};

export default LogoHalf;
