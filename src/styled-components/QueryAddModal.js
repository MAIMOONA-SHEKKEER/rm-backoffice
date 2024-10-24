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
  Box
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const QueryAddModal = ({ open, onClose, query, onSubmit, actionType }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contactNumber: "",
    queries: [""], // Default to one empty query input
  });

  useEffect(() => {
    if (actionType === "edit" && query) {
      setFormData({
        ownerName: query.ownerName || "",
        contactNumber: query.contactNumber || "",
        queries: query.queries.length ? query.queries : [""], // Handle empty query array
      });
    } else {
      setFormData({
        ownerName: "",
        contactNumber: "",
        queries: [""],
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
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {actionType === "edit" ? "Edit Query" : "Add Query"}
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {actionType === "edit" ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QueryAddModal;
