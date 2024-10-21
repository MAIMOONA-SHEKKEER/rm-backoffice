import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailItem = ({ label, value }) => (
  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    {label}: <span style={{ color: "#5e35b1" }}>{value}</span>
  </Typography>
);

const PropertyManagerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyManager = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/property-managers/${id}`);
        if (response) { 
          setManager(response);
        } else {
          setError("Property Manager not found");
        }
      } catch (err) {
        setError("Error fetching property manager details");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyManager();
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!manager) {
    return <Typography variant="h6">Property Manager not found</Typography>;
  }

  const { name, email, phone } = manager.data;
  console.log('aman',manager.data)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
        backgroundColor: "#f3e5f5",
      }}
    >
      <Card
        sx={{
          width: "60%",
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
            Property Manager Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <DetailItem label="Name" value={name} />
            <DetailItem label="ID" value={id} />
            <DetailItem label="Email" value={email} />
            <DetailItem label="Phone" value={phone} />
          </Box>
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

export default PropertyManagerDetails;