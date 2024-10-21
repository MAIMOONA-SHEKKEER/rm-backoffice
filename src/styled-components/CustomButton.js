import React from "react";
import { Button, styled, Box } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: '#512da8',
}));

const CustomButton = ({
  text,
  disabled = false,
  onClick,
  type = "button",
  fullWidth = false,
  pl = 1,
  pr = 1,
  ...otherProps
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
    <StyledButton
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      type={type}
      sx={{ paddingLeft: pl, paddingRight: pr }}
      fullWidth={fullWidth}
      {...otherProps}
    >
      {text}
    </StyledButton>
  </Box>
);

export default CustomButton;
