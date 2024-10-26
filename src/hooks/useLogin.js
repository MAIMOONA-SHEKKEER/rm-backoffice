import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [dummyOtp, setDummyOtp] = useState("");

  const handleEmailPasswordLogin = async (values) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        return true;
      }
    } catch (error) {
      setError("Invalid email or password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (values) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        if (values.email.includes("@")) {
          setOtpSent(true);
          setDummyOtp(generatedOtp);
          setEmail(values.email);
          setSuccessMessage(`OTP sent to ${values.email}. OTP: ${generatedOtp}`);
          resolve(true);
        } else {
          setError("Invalid email address");
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
    handleEmailPasswordLogin,
    handleSendOtp,
    handleVerifyOtp,
    setOtp,
    setError,
    setSuccessMessage,
  };
};

export default useLogin;
