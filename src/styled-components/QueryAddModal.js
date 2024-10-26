import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const QueryAddModal = ({ open, onClose, query, onSubmit, actionType }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contactNumber: "",
    queries: [""], 
    status: "",
  });

  useEffect(() => {
    if (actionType === "edit" && query) {
      setFormData({
        ownerName: query.ownerName || "",
        contactNumber: query.contactNumber || "",
        queries: query.queries.length ? query.queries : [""], 
        status: query.status || "Open",
      });
    } else if (actionType === "delete") {
      setFormData({
        ownerName: "",
        contactNumber: "",
        queries: [""],
        status: "Open",
      });
    } else {
      setFormData({
        ownerName: "",
        contactNumber: "",
        queries: [""],
        status: "",
      });
    }
  }, [query, actionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQueryChange = (index, value) => {
    const updatedQueries = [...formData.queries];
    updatedQueries[index] = value;
    setFormData({ ...formData, queries: updatedQueries });
  };

  const handleAddQuery = () => {
    setFormData({ ...formData, queries: [...formData.queries, ""] });
  };

  const handleRemoveQuery = (index) => {
    const updatedQueries = formData.queries.filter((_, i) => i !== index);
    setFormData({ ...formData, queries: updatedQueries });
  };

  const handleSubmit = () => {
    if (actionType === "delete") {
     
        onSubmit(formData);
        onClose();
  
    } else {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {actionType === "edit" ? "Edit Query" : actionType === "delete" ? "Delete Confirmation" : "Add Query"}
      </DialogTitle>
      <DialogContent>
        {actionType === "delete" ? (
          <Typography variant="body1">
            Are you sure you want to delete this query?
          </Typography>
        ) : (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Queries
            </Typography>
            {formData.queries.map((queryItem, index) => (
              <Box key={index} display="flex" alignItems="center" sx={{ mb: 1 }}>
                <TextField
                  margin="dense"
                  label={`Query ${index + 1}`}
                  value={queryItem}
                  onChange={(e) => handleQueryChange(index, e.target.value)}
                  fullWidth
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveQuery(index)}
                  disabled={formData.queries.length === 1}
                >
                  <RemoveCircle />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              onClick={handleAddQuery}
              sx={{ mt: 1 }}
            >
              Add Another Query
            </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {actionType === "edit" ? "Update" : actionType === "delete" ? "Delete" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QueryAddModal;
