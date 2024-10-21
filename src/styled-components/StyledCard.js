import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  width: "100%",
  boxShadow: theme.shadows[20],
  padding: theme.spacing(3),
}));
