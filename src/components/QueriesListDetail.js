import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const DetailItem = ({ label, value }) => (
  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    {label}: <span style={{ color: "#5e35b1" }}>{value}</span>
  </Typography>
);

const QueryStatus = ({ status }) => (
  <DetailItem
    label="Status"
    value={
      <Chip
        label={status}
        color={status === "Resolved" ? "success" : "error"}
      />
    }
  />
);

const QueryList = ({ queries }) => (
  <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: 1, padding: 2 }}>
    {Array.isArray(queries) && queries.length > 0 ? (
      queries.map((q, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ color: "#5e35b1", marginBottom: 1 }}
        >
          - {q}
        </Typography>
      ))
    ) : (
      <Typography variant="body2" sx={{ color: "#5e35b1" }}>
        No queries available.
      </Typography>
    )}
  </Box>
);

const QueriesListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await axiosInstance.get(`/queries/${id}`);
        setQuery(response.data.data);
      } catch (err) {
        setError("Failed to fetch query details.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueryDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", marginTop: 4 }}
      >
        {error}
      </Typography>
    );
  }

  if (!query) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
        Query not found
      </Typography>
    );
  }

  const { contactNumber, ownerName, queries: queryList, status } = query;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
        backgroundColor: "#f3e5f5",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%" },
          boxShadow: 4,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#512da8", marginBottom: 2 }}
          >
            Query Details
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <DetailItem label="ID" value={query.id} />
            <DetailItem label="Contact Number" value={contactNumber} />
            <DetailItem label="Owner Name" value={ownerName} />
            <QueryStatus status={status} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Queries:
          </Typography>
          <QueryList queries={queryList} />

          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              marginTop: 2,
              backgroundColor: "#512da8",
              color: "#fff",
              "&:hover": { backgroundColor: "#673ab7" },
            }}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QueriesListDetail;
