import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import AppTable from "./AppTable";
import { queriesColumns, queries } from "../data/queries";
import FilterDropdown from "../styled-components/FilterDropdown";
import StyledHeader from "../styled-components/StyledHeader";
import { useNavigate } from "react-router-dom";

const QueriesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchOptions = useMemo(() => {
    return [
      ...new Set(
        queries.flatMap((query) => [
          query.ownerName,
          query.status,
          ...query.queries,
        ])
      ),
    ].filter((option) => option !== undefined && option !== null);
  }, []);

  const filteredQueries = useMemo(() => {
    return queries.filter((query) => {
      if (!searchQuery) return true;
      const queryLower = searchQuery.toLowerCase();

      const queriesMatch = query.queries.some(q => q.toLowerCase().includes(queryLower));

      return (
        query.ownerName.toLowerCase().includes(queryLower) ||
        query.status.toLowerCase().includes(queryLower) ||
        queriesMatch 
      );
    });
  }, [searchQuery]);

  const handleView = (manager) => {
    navigate(`/dashboard/queries/${manager.id}`);
  };

  return (
    <Box sx={{ p: 2,marginLeft:30 }}>
      <StyledHeader variant="h4">Queries</StyledHeader>
      <FilterDropdown
        options={searchOptions}
        label="Search by Name, Status, or Query"
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue || "")}
      />
      <AppTable columns={queriesColumns} data={filteredQueries} onView={handleView}/>
    </Box>
  );
};

export default QueriesList;
