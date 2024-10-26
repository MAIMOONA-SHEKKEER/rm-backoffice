import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTable from "./AppTable";
import FilterDropdown from "../styled-components/FilterDropdown";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import CustomerModal from "../styled-components/CustomerModal";
import SnackbarMessage from "../styled-components/SnackbarMessage"; 
import { propertyManagersColumns } from "../data/propertyMangers";
import usePropertyManagers from "../hooks/usePropertyManagers";
import PageHeader from "../styled-components/PageHeader";

const PropertyManagers = () => {
  const {
    propertyManagers,
    selectedManager,
    setSelectedManager,
    createPropertyManager,
    updatePropertyManager,
    deletePropertyManager,
    downloadPropertyManagers, // New API call for download
  } = usePropertyManagers();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  }); 

  const navigate = useNavigate();

  const openModal = (type, manager = null) => {
    setActionType(type);
    setSelectedManager(manager);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedManager(null);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, severity, message });
  };

  const handleAction = async (managerData) => {
    try {
      if (actionType === "add") {
        await createPropertyManager(managerData);
        showSnackbar("Property manager added successfully!");
      } else if (actionType === "edit") {
        await updatePropertyManager(managerData);
        showSnackbar("Property manager updated successfully!");
      } else if (actionType === "delete") {
        await deletePropertyManager();
        showSnackbar("Property manager deleted successfully!");
      }
      handleModalClose();
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, "error");
    }
  };

  const handleDownload = async () => {
    try {
      await downloadPropertyManagers();  
      showSnackbar("Property managers data downloaded successfully!");
    } catch (error) {
      showSnackbar(`Error downloading data: ${error.message}`, "error");
    }
  };

  const searchOptions = useMemo(() => {
    return [
      ...new Set(
        propertyManagers.flatMap((manager) => [
          manager.name,
          manager.id.toString(),
          manager.phone,
          manager.email,
        ])
      ),
    ].filter(Boolean);
  }, [propertyManagers]);

  const filteredPropertyManagers = useMemo(() => {
    return propertyManagers.filter((manager) => {
      if (!searchQuery) return true;
      const queryLower = searchQuery.toLowerCase();
      return (
        manager.name.toLowerCase().includes(queryLower) ||
        manager.id.toString().includes(queryLower) ||
        manager.phone.toLowerCase().includes(queryLower) ||
        manager.email.toLowerCase().includes(queryLower)
      );
    });
  }, [searchQuery, propertyManagers]);

  const handleView = (manager) => {
    navigate(`/dashboard/property-managers/${manager.id}`);
  };

  return (
    <Box sx={{ p: 2, marginLeft: 30 }}>
     <PageHeader
        title="Property Managers"
        buttons={[
          { text: "Add", onClick: () => openModal("add"), icon: <AddIcon /> },
          { text: "Download", onClick: handleDownload, icon: <DownloadIcon /> },
        ]}
      />
      <FilterDropdown
        options={searchOptions}
        label="Search by Name, ID, Phone, or Email"
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue || "")}
      />

      <AppTable
        columns={propertyManagersColumns}
        data={filteredPropertyManagers}
        onView={handleView}
        onEdit={(manager) => openModal("edit", manager)}
        onDelete={(manager) => openModal("delete", manager)}
      />

      <CustomerModal
        open={modalOpen}
        onClose={handleModalClose}
        customer={selectedManager}
        onSubmit={handleAction}
        actionType={actionType}
      />

      <SnackbarMessage
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default PropertyManagers;
