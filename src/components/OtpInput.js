import { Box } from "@mui/material";
import React from "react";
import OTPInput from "react-otp-input";

const OtpInputComponent = ({ value, onChange, numInputs }) => {
  return (
    <Box display="flex" justifyContent="center" mb={2}>
      <OTPInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        renderInput={(props) => <input {...props} />}
        separator={<span>-</span>}
        inputStyle={{
          width: "3rem",
          height: "3rem",
          margin: "0 0.5rem",
          fontSize: "1.5rem",
          borderRadius: 4,
          border: "1px solid #ced4da",
          textAlign: "center",
        }}
        isInputNum
      />
    </Box>
  );
};

export default OtpInputComponent;
