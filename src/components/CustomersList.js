import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCustomers from "../hooks/useCustomers";
import FilterDropdown from "../styled-components/FilterDropdown";
import AppTable from "./AppTable";
import CustomerModal from "../styled-components/CustomerModal";
import SnackbarMessage from "../styled-components/SnackbarMessage";
import { customerColumns } from "../data/customers";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import PageHeader from "../styled-components/PageHeader";

const CustomersList = () => {
  const {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const openModal = (type, customer = null) => {
    setActionType(type);
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  const searchOptions = useMemo(() => {
    return [
      ...new Set(
        customers.flatMap((customer) => [
          customer.name,
          customer.id.toString(),
          customer.phone,
          customer.email,
        ])
      ),
    ].filter((option) => option);
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      if (!searchQuery) return true;
      const queryLower = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(queryLower) ||
        customer.id.toString().toLowerCase().includes(queryLower) ||
        customer.phone.toLowerCase().includes(queryLower) ||
        customer.email.toLowerCase().includes(queryLower)
      );
    });
  }, [searchQuery, customers]);

  const handleView = (customer) => {
    navigate(`/dashboard/customers/${customer.id}`);
  };

  const handleSubmit = async (data) => {
    if (actionType === "add") {
      await createCustomer(data);
      showSnackbar("Customer created successfully!", "success");
    } else if (actionType === "edit") {
      await updateCustomer(selectedCustomer.id, data);
      showSnackbar("Customer updated successfully!", "success");
    } else if (actionType === "delete") {
      await deleteCustomer(selectedCustomer.id);
      showSnackbar("Customer deleted successfully!", "success");
    }
    handleModalClose();
  };

  const handleDownloadPDF = () => {
    window.open("http://localhost:8085/customers", "_blank");
  };

  return (
    <Box sx={{ p: 2, marginLeft: 30 }}>
      <PageHeader
        title="Customers"
        buttons={[
          { text: "Add", onClick: () => openModal("add"), icon: <AddIcon /> },
          {
            text: "Download",
            onClick: handleDownloadPDF,
            icon: <DownloadIcon />,
          },
        ]}
      />
      <FilterDropdown
        options={searchOptions}
        label="Search by Name, ID, Phone, or Email"
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue || "")}
      />
      <AppTable
        columns={customerColumns}
        data={filteredCustomers}
        onView={handleView}
        onEdit={(customer) => openModal("edit", customer)}
        onDelete={(customer) => openModal("delete", customer)}
        loading={loading}
      />

      <CustomerModal
        open={modalOpen}
        onClose={handleModalClose}
        customer={selectedCustomer}
        onSubmit={handleSubmit}
        actionType={actionType}
      />
      <SnackbarMessage
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
};

export default CustomersList;
