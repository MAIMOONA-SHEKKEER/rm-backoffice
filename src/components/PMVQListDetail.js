import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { propertyManagersQueue } from "../data/propertyManagerQueue";

const PMVQListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const manager = propertyManagersQueue.find(
    (manager) => manager.id.toString() === id
  );

  if (!manager) {
    return <Typography variant="h6">Property Manager not found</Typography>;
  }

  const { name, email, phone } = manager;

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
            Property Manager Verification Queue Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Name: <span style={{ color: "#5e35b1" }}>{name}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ID: <span style={{ color: "#5e35b1" }}>{manager.id}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Email: <span style={{ color: "#5e35b1" }}>{email}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Phone: <span style={{ color: "#5e35b1" }}>{phone}</span>
            </Typography>
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

export default PMVQListDetail;
