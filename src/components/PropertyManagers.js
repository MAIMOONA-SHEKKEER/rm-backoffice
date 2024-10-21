import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import FilterDropdown from "../styled-components/FilterDropdown";
import AppTable from "./AppTable";
import StyledHeader from "../styled-components/StyledHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerModal from "../styled-components/CustomerModal";
import CustomButton from "../styled-components/CustomButton";
import { propertyManagersColumns } from "../data/propertyMangers";

const PropertyManagers = () => {
  const [propertyManagers, setPropertyManagers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPropertyManagers();
  }, []);

  const fetchPropertyManagers = () => {
    axios
      .get("http://localhost:8085/api/property-managers")
      .then((response) => setPropertyManagers(response.data))
      .catch((error) => console.error("Error fetching property managers:", error));
  };

  const createPropertyManager = async (managerData) => {
    try {
      await axios.post("http://localhost:8085/api/property-managers", managerData);
      fetchPropertyManagers();
    } catch (error) {
      console.error("Error creating property manager:", error);
    }
  };

  const updatePropertyManager = async (managerData) => {
    try {
      await axios.put(
        `http://localhost:8085/api/property-managers/${selectedManager.id}`,
        managerData
      );
      fetchPropertyManagers();
    } catch (error) {
      console.error("Error updating property manager:", error);
    }
  };

  const deletePropertyManager = async () => {
    try {
      await axios.delete(
        `http://localhost:8085/api/property-managers/${selectedManager.id}`
      );
      fetchPropertyManagers();
    } catch (error) {
      console.error("Error deleting property manager:", error);
    }
  };

  const openModal = (type, manager = null) => {
    setActionType(type);
    setSelectedManager(manager);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedManager(null);
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
    ].filter((option) => option);
  }, [propertyManagers]);

  const filteredPropertyManagers = useMemo(() => {
    return propertyManagers.filter((manager) => {
      if (!searchQuery) return true;
      const queryLower = searchQuery.toLowerCase();
      return (
        manager.name.toLowerCase().includes(queryLower) ||
        manager.id.toString().toLowerCase().includes(queryLower) ||
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
      <StyledHeader variant="h4">Property Managers</StyledHeader>
      <CustomButton text={"Add Property Manager"} onClick={() => openModal("add")} />
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
        onSubmit={
          actionType === "add"
            ? createPropertyManager
            : actionType === "edit"
            ? updatePropertyManager
            : deletePropertyManager
        }
        actionType={actionType}
      />
    </Box>
  );
};

export default PropertyManagers;
