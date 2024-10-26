import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Tabs, Tab, Divider } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useLogin from "../hooks/useLogin"; 
import InputField from "../styled-components/InputField";
import SubmitButton from "../styled-components/SubmitButton";
import SnackbarMessage from "../styled-components/SnackbarMessage";
import StyledWrapper from "../styled-components/StyledWrapper";
import FormContainer from "../styled-components/FormContainer";
import OtpInputComponent from "../components/OtpInput";

const emailPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState(0);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    loading,
    error,
    successMessage,
    otpSent,
    email,
    handleSendOtp,
    handleVerifyOtp,
    setOtp,
    setError,
    setSuccessMessage,
    handleEmailPasswordLogin,
  } = useLogin();

  const handleSendOtpWrapper = async (values, { setSubmitting }) => {
    const success = await handleSendOtp(values);
    setSubmitting(false);
    if (success) setStep(2);
  };
  const handleVerifyOtpWrapper = async (values, { setSubmitting }) => {
    const success = await handleVerifyOtp(values.otp);
    setSubmitting(false);
    if (success) navigate("/dashboard");
  };

  return (
    <StyledWrapper>
      <FormContainer>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>

        <Tabs
          value={loginMethod}
          onChange={(e, newValue) => {
            setLoginMethod(newValue);
            setStep(1);
          }}
          centered
        >
          <Tab label="Email & Password" />
          <Tab label="OTP Login" />
        </Tabs>

        <Divider sx={{ margin: "16px 0" }} />

        {loginMethod === 0 && (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={emailPasswordSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const success = await handleEmailPasswordLogin(values);
              setSubmitting(false);
              if (success) navigate("/dashboard");
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <InputField
                  label="Email"
                  name="email"
                  error={errors.email}
                  touched={touched.email}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  error={errors.password}
                  touched={touched.password}
                />
                <Box mt={2} mb={2}>
                  <SubmitButton
                    loading={loading}
                    isSubmitting={isSubmitting}
                    text="Login"
                  />
                </Box>
                <Typography variant="body2" textAlign="center">
                  Don't have an account?{" "}
                  <Box
                    component="span"
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Box>
                </Typography>
              </Form>
            )}
          </Formik>
        )}

        {loginMethod === 1 && step === 1 && (
          <Formik initialValues={{ email: "" }} onSubmit={handleSendOtpWrapper}>
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <InputField
                  label="Email"
                  name="email"
                  error={errors.email}
                  touched={touched.email}
                />
                <Box mt={2} mb={2}>
                  <SubmitButton
                    loading={loading}
                    isSubmitting={isSubmitting}
                    text="Send OTP"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        )}

        {loginMethod === 1 && step === 2 && otpSent && (
          <Formik initialValues={{ otp: "" }} onSubmit={handleVerifyOtpWrapper}>
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Typography variant="body1" gutterBottom>
                  OTP sent to {email}. Please enter the OTP.
                </Typography>
                <OtpInputComponent
                  value={values.otp}
                  onChange={(value) => {
                    setOtp(value);
                    handleChange({ target: { name: "otp", value } });
                  }}
                  numInputs={4}
                />
                <Box mt={2} mb={2}>
                  <SubmitButton
                    loading={loading}
                    isSubmitting={isSubmitting}
                    text="Verify OTP"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        )}

        <SnackbarMessage
          open={!!error}
          onClose={() => setError(null)}
          severity="error"
          message={error}
        />
        <SnackbarMessage
          open={!!successMessage}
          onClose={() => setSuccessMessage(null)}
          severity="success"
          message={successMessage}
        />
      </FormContainer>
    </StyledWrapper>
  );
};

export default LoginForm;
