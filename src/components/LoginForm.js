import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useLogin from "../hooks/useLogin";
import InputField from "../styled-components/InputField";
import SubmitButton from "../styled-components/SubmitButton";
import SnackbarMessage from "../styled-components/SnackbarMessage";
import StyledWrapper from "../styled-components/StyledWrapper";
import FormContainer from "../styled-components/FormContainer";
import OtpInputComponent from "../components/OtpInput";

const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .min(4, "OTP should be 4 digits")
    .required("OTP is required"),
});

const LoginForm = () => {
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
  } = useLogin();

  const handleSendOtpWrapper = async (values, { setSubmitting }) => {
    const success = await handleSendOtp(values);
    setSubmitting(false);
    if (success) {
      setStep(2);
    }
  };

  const handleVerifyOtpWrapper = async (values, { setSubmitting }) => {
    const success = await handleVerifyOtp(values.otp);
    setSubmitting(false);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <StyledWrapper>
      <FormContainer>
        <Typography variant="h5" gutterBottom textAlign="center">
          {step === 1 ? "Login with Email" : "Verify OTP"}
        </Typography>

        {step === 1 && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleSendOtpWrapper}
          >
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

        {step === 2 && otpSent && (
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={otpValidationSchema}
            onSubmit={handleVerifyOtpWrapper}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Typography variant="body1" gutterBottom>
                  OTP sent to {email}. Please check your inbox.
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
