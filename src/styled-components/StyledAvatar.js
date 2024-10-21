import { Avatar, styled } from "@mui/material";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  padding: 10,
  backgroundColor: theme.palette.primary.main,
  margin: 10,
  color: theme.palette.primary.contrastText,
}));

export default StyledAvatar;