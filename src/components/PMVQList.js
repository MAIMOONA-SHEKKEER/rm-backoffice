import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTable from "./AppTable";
import {
  propertyManagersQueue,
  propertyManagersQueueColumns,
} from "../data/propertyManagerQueue";
import FilterDropdown from "../styled-components/FilterDropdown";
import StyledHeader from "../styled-components/StyledHeader";

const PMVQList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchOptions = useMemo(() => {
    return [
      ...new Set(
        propertyManagersQueue.flatMap((manager) => [
          manager.name,
          manager.id.toString(),
          manager.phone,
          manager.email,
        ])
      ),
    ].filter((option) => option !== undefined && option !== null);
  }, []);

  const filteredManagers = useMemo(() => {
    return propertyManagersQueue.filter((manager) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        manager.name.toLowerCase().includes(query) ||
        manager.id.toString().toLowerCase().includes(query) ||
        manager.phone.toLowerCase().includes(query) ||
        manager.email.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleView = (manager) => {
    navigate(`/dashboard/pm-verification/${manager.id}`);
  };

  return (
    <Box sx={{ p: 2,marginLeft:30 }}>
      <StyledHeader variant="h4">Property Managers Verification Queue</StyledHeader>
      <FilterDropdown
        options={searchOptions}
        label="Search by Name, ID, Phone, or Email"
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue || "")}
      />
      <AppTable
        columns={propertyManagersQueueColumns}
        data={filteredManagers}
        onView={handleView}
      />
    </Box>
  );
};

export default PMVQList;
