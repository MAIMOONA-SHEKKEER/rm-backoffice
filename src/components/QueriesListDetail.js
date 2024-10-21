import React from "react";
import { Box, Card, CardContent, Typography, Button, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { queries } from "../data/queries"; 

const QueriesListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const query = queries.find((query) => query.id.toString() === id);

  if (!query) {
    return <Typography variant="h6">Query not found</Typography>;
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
        padding: 2 
      }}
    >
      <Card sx={{ width: { xs: "90%", sm: "80%", md: "60%" }, boxShadow: 4, borderRadius: 2, padding: 3, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#512da8", marginBottom: 2 }}>Query Details</Typography>
          
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ID: <span style={{ color: "#5e35b1" }}>{query.id}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Contact Number: <span style={{ color: "#5e35b1" }}>{contactNumber}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Owner Name: <span style={{ color: "#5e35b1" }}>{ownerName}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Status: 
              <Chip 
                label={status} 
                color={status === "Open" ? "success" : "error"} 
                sx={{ marginLeft: 1 }} 
              />
            </Typography>
          </Box>
          
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Queries:</Typography>
          <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: 1, padding: 2 }}>
            {queryList.map((q, index) => (
              <Typography key={index} variant="body2" sx={{ color: "#5e35b1", marginBottom: 1 }}>
                - {q}
              </Typography>
            ))}
          </Box>
          
          <Button 
            variant="contained" 
            onClick={() => navigate(-1)} 
            sx={{ marginTop: 2, backgroundColor: "#512da8", color: "#fff", '&:hover': { backgroundColor: "#673ab7" } }}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QueriesListDetail;
