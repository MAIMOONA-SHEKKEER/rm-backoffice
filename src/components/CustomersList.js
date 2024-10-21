import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import FilterDropdown from "../styled-components/FilterDropdown";
import AppTable from "./AppTable";
import StyledHeader from "../styled-components/StyledHeader";
import { useNavigate } from "react-router-dom";
import { customerColumns } from "../data/customers";
import axios from "axios";
import CustomerModal from "../styled-components/CustomerModal";
import CustomButton from "../styled-components/CustomButton";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8085/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const createCustomer = async (customerData) => {
    try {
      await axios.post("http://localhost:8085/api/customers", customerData);
      fetchCustomers();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const updateCustomer = async (customerData) => {
    try {
      await axios.put(
        `http://localhost:8085/api/customers/${selectedCustomer.id}`,
        customerData
      );
      fetchCustomers();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const deleteCustomer = async () => {
    try {
      await axios.delete(
        `http://localhost:8085/api/customers/${selectedCustomer.id}`
      );
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
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

  return (
    <Box sx={{ p: 2, marginLeft: 30 }}>
      <StyledHeader variant="h4">Customers</StyledHeader>
      <CustomButton text={"Add Customer"} onClick={() => openModal("add")} />
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
      />
      <CustomerModal
        open={modalOpen}
        onClose={handleModalClose}
        customer={selectedCustomer}
        onSubmit={
          actionType === "add"
            ? createCustomer
            : actionType === "edit"
            ? updateCustomer
            : deleteCustomer
        }
        actionType={actionType}
      />
    </Box>
  );
};

export default CustomersList;
