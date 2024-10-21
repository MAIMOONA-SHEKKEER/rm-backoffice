import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import AppTable from "./AppTable";
import { customersQueue, customersQueueColumns } from "../data/customerQueue";
import FilterDropdown from "../styled-components/FilterDropdown";
import StyledHeader from "../styled-components/StyledHeader";
import { useNavigate } from "react-router-dom";

const CVQList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchOptions = useMemo(() => {
    return [
      ...new Set(
        customersQueue.flatMap((customer) => [
          customer.name,
          customer.id.toString(),
          customer.phone,
          customer.email,
        ])
      ),
    ].filter((option) => option !== undefined && option !== null);
  }, []);

  const filteredCustomers = useMemo(() => {
    return customersQueue.filter((customer) => {
      if (!searchQuery) return true;
      const queryLower = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(queryLower) ||
        customer.id.toString().toLowerCase().includes(queryLower) ||
        customer.phone.toLowerCase().includes(queryLower) ||
        customer.email.toLowerCase().includes(queryLower)
      );
    });
  }, [searchQuery]);

  const handleView = (manager) => {
    navigate(`/dashboard/customer-verification/${manager.id}`);
  };

  return (
    <Box sx={{ p: 2,marginLeft:30 }}>
      <StyledHeader variant="h4">Customer Verification Queue</StyledHeader>
      <FilterDropdown
        options={searchOptions}
        label="Search by Name, ID, Phone, or Email"
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue || "")}
      />
      <AppTable columns={customersQueueColumns} data={filteredCustomers} onView={handleView} />
    </Box>
  );
};

export default CVQList;
