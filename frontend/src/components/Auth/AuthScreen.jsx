

const AuthScreen = ({ children }) => {


  return (
    <>
      <div className="relative w-full min-h-[100vh] h-fit bg-black bg-cover text-white flex justify-center items-center overflow-x-hidden">
        {children}
      </div>
    </>
  );
};

export default AuthScreen;
