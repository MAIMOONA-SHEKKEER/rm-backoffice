import React from "react";
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({ loading, isSubmitting, text }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{backgroundColor: '#512da8' }}
    disabled={isSubmitting || loading}
    startIcon={loading && <CircularProgress size={20} />}
  >
    {loading ? `${text}...` : text}
  </Button>
);

export default SubmitButton;
