import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,TextField
} from "@mui/material";

const CustomerModal = ({ open, onClose, customer, onSubmit, actionType }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (actionType === "edit" && customer) {
      setFormData({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
      });
    }
  }, [customer, actionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {actionType === "edit" ? "Edit " : actionType === "delete" ? "Delete " : "Add"}
      </DialogTitle>
      <DialogContent>
        {actionType === "delete" ? (
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete <strong>{customer?.name}</strong>?
          </Typography>
        ) : (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={actionType === "delete" ? "error" : "primary"}
        >
          {actionType === "delete" ? "Delete" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerModal;
