import React from "react";
import { Box, Divider, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import StyledWrapper from "../styled-components/StyledWrapper";
import StyledGrid from "../styled-components/StyledGrid";

const DashboardContent = ({ drawerWidth }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { xs: `100%`, sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        transition: "margin-left 0.3s",
      }}
    >
      <Toolbar />
      <StyledWrapper>
        <StyledGrid>
          <Divider sx={{ my: 3 }} />
          <Outlet />
        </StyledGrid>
      </StyledWrapper>
    </Box>
  );
};

export default DashboardContent;
