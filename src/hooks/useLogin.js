import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [dummyOtp, setDummyOtp] = useState('');

  const handleSendOtp = async (values) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        if (values.email.includes('@')) {
          setOtpSent(true);
          setDummyOtp(generatedOtp);
          setEmail(values.email);
          setSuccessMessage(`OTP Sent to ${values.email}. Your OTP is: ${generatedOtp}`);
          resolve(true);
        } else {
          setError("Email not found");
          resolve(false);
        }
      }, 2000);
    });
  };

  const handleVerifyOtp = async (value) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        if (value === dummyOtp) {
          setSuccessMessage("Login successful!");
          resolve(true);
        } else {
          setError("Invalid OTP");
          resolve(false);
        }
      }, 2000);
    });
  };

  return {
    loading,
    error,
    successMessage,
    otpSent,
    email,
    otp,
    handleSendOtp,
    handleVerifyOtp,
    setOtp,
    setError,
    setSuccessMessage,
  };
};

export default useLogin;
