import React from "react";
import { Box } from "@mui/material";
import StyledHeader from "../styled-components/StyledHeader";
import CustomButton from "../styled-components/CustomButton";

const PageHeader = ({ title, buttons = [] }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <StyledHeader variant="h4">{title}</StyledHeader>

      <Box display="flex" gap={2}>
        {buttons.map((button, index) => (
          <CustomButton
            key={index}
            text={button.text}
            onClick={button.onClick}
            startIcon={button.icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PageHeader;
