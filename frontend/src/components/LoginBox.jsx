import AuthContainer from "./Auth/AuthContainer";
import LoginHalf from "./Auth/LoginHalf";
import LogoHalf from "./Auth/LogoHalf";

const LoginBox = () => {
  return (
    <AuthContainer>
      <LogoHalf className={`sm:hidden`}/>
      <LoginHalf />
      <LogoHalf className={`max-sm:hidden`} />
    </AuthContainer>
  );
};

export default LoginBox;
