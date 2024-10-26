import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomButton from "../styled-components/CustomButton";

const DetailItem = ({ label, value }) => (
  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    {label}: <span style={{ color: "#5e35b1" }}>{value}</span>
  </Typography>
);

const DetailView = ({ title, fetchUrl, fields, dataExtractor }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${fetchUrl}/${id}`);
        const result = dataExtractor
          ? dataExtractor(response.data)
          : response.data;
        if (result) setData(result);
        else setError(`${title} not found`);
      } catch (err) {
        setError(`Error fetching ${title} details`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, fetchUrl, title, dataExtractor]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!data) {
    return <Typography variant="h6">{title} not found</Typography>;
  }

  const handleGenerate = () => {
    const url = `http://localhost:8085/customers/${id}`;
    window.open(url, "_blank");
  };

  const downloadPdf = async () => {
    const url = `http://localhost:8085/api/customers/${id}/download`;
    window.open(url, "_blank");
  };

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
            {title} Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {fields.map((field) => (
              <DetailItem
                key={field.label}
                label={field.label}
                value={data[field.key]}
              />
            ))}
          </Box>
          <CustomButton text={"Go Back"} onClick={() => navigate(-1)} />
          <CustomButton text="Generate Document" onClick={handleGenerate} />
          <CustomButton text="Download PDF" onClick={downloadPdf} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailView;
