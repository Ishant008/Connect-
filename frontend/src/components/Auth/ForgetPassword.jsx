import React, { useState, useRef } from "react";
import Axios from "../../config/Axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [goLoginPage, SetGoLoginPage] = useState(false);
  const emailRef = useRef(null);
  const otpRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));
  const passwordRef = useRef(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    const enteredEmail = emailRef.current.value;
    setEmail(enteredEmail);
    if (!enteredEmail) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    Axios.post("/auth/send-reset-code", { email: enteredEmail }).then((res) => {
      setLoading(false);
      res.data.error ? setError(res.data.message) : setStep(2);
    });
  };

  const handleOTPChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs[index + 1].current.focus();
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = otp.map((_, i) => pasteData[i] || "");
    setOtp(newOtp);
    otpRefs[newOtp.length - 1]?.current?.focus();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    const enteredOtp = otp.join("");
    const newPassword = passwordRef.current.value;
    if (enteredOtp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    if (!newPassword) {
      setError("New password is required");
      return;
    }
    setLoading(true);
    Axios.post("/auth/reset-password", {
      email,
      otp: enteredOtp,
      password: newPassword,
    }).then((res) => {
      setLoading(false);
      if (res.data.error) {
        setError(res.data.message);
      } else {
        toast.success("Password reset successfully");
        SetGoLoginPage(true);
      }
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md flex flex-col p-6 gap-4 border border-white rounded-lg">
        {goLoginPage ? (
          <NavLink
            className="flex justify-center items-center gap-2 w-full py-2 text-lg border-2 border-white rounded hover:bg-white hover:text-black transition-all duration-200"
            to="/login"
          >
            Go to Login Page <FaArrowRight size={20}/>
          </NavLink>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center">
              Forgot Password
            </h2>
            <form
              onSubmit={step === 1 ? handleSendOTP : handleResetPassword}
              className="flex flex-col gap-4"
            >
              {step === 1 ? (
                <input
                  ref={emailRef}
                  className="p-3 outline-none w-full border border-white bg-black text-white focus:bg-gray-900 rounded"
                  type="email"
                  placeholder="Enter your email"
                />
              ) : (
                <>
                  <div
                    className="flex justify-center gap-2"
                    onPaste={handlePaste}
                  >
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl border border-white bg-black text-white focus:bg-gray-900 rounded"
                      />
                    ))}
                  </div>
                  <input
                    ref={passwordRef}
                    className="p-3 outline-none w-full border border-white bg-black text-white focus:bg-gray-900 rounded"
                    type="password"
                    placeholder="Enter new password"
                  />
                </>
              )}
              {error && <p className="text-red-600 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 text-lg border-2 border-white rounded hover:bg-white hover:text-black transition-all duration-200"
              >
                {loading
                  ? "Loading..."
                  : step === 1
                  ? "Send OTP"
                  : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
