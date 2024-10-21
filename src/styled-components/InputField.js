import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";

const InputField = ({ label, name, error, touched }) => (
  <Field
    as={TextField}
    label={label}
    name={name}
    fullWidth
    margin="normal"
    variant="outlined"
    error={touched && !!error}
    helperText={touched && error}
  />
);

export default InputField;
