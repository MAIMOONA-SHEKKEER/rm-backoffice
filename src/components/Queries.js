import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useQueries from "../hooks/useQueries"; 
import FilterDropdown from "../styled-components/FilterDropdown";
import AppTable from "./AppTable";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import SnackbarMessage from "../styled-components/SnackbarMessage";
import { queriesColumns} from "../data/queries";
import QueryAddModal from "../styled-components/QueryAddModal";
import PageHeader from "../styled-components/PageHeader";

const QueriesList = () => {
  const {
    queries,
    loading,
    error,
    createQuery,
    updateQuery,
    deleteQuery,
  } = useQueries(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const openModal = (type, query = null) => {
    setActionType(type);
    setSelectedQuery(query);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedQuery(null);
  };

  const searchOptions = useMemo(() => {
    return [
      ...new Set(
        queries.flatMap((query) => [
          query.ownerName,
          query.contactNumber,
          query.status,
          ...query.queries,
        ])
      ),
    ].filter((option) => option);
  },[queries]);

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
  }, [searchQuery,queries]);

  const handleView = (query) => {
    navigate(`/dashboard/queries/${query.id}`);
  };

  const handleSubmit = async (data) => {
    try {
      if (actionType === "add") {
        await createQuery(data);
        showSnackbar("Query created successfully!", "success");
      } else if (actionType === "edit") {
        await updateQuery(selectedQuery.id, data);
        showSnackbar("Query updated successfully!", "success");
      } else if (actionType === "delete") {
        await deleteQuery(selectedQuery.id);
        showSnackbar("Query deleted successfully!", "success");
      }
      handleModalClose();
    } catch (err) {
      showSnackbar(err.message || "An error occurred!", "error");
    }
  };

  const handleDownloadPDF = () => {
    window.open("http://localhost:8085/queries", "_blank");
  };

  return (
    <Box sx={{ p: 2, marginLeft: 30 }}>
       <PageHeader
        title="Queries"
        buttons={[
          { text: "Add", onClick: () => openModal("add"), icon: <AddIcon /> },
          { text: "Download", onClick: handleDownloadPDF, icon: <DownloadIcon /> },
        ]}
      />
      <FilterDropdown
        options={searchOptions}
        label="Search by Name, Status, or Query"
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue || "")}
      />
      <AppTable
        columns={queriesColumns}
        data={filteredQueries}
        onView={handleView}
        onEdit={(query) => openModal("edit", query)}
        onDelete={(query) => openModal("delete", query)}
        loading={loading}
      />
      <QueryAddModal
        open={modalOpen}
        onClose={handleModalClose}
        query={selectedQuery}
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

export default QueriesList;
