import React from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const SnackbarMessage = ({ open, onClose, severity, message }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Alert onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);
export default SnackbarMessage;
