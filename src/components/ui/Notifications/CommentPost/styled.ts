/** Libraries */
import { styled } from "@mui/material/styles";

import { SnackbarContent } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

/** Material UI - Custom components */
export const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    minWidth: "344px",
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#ffc400",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: "space-between",
}));

export const A = styled("a")(({ theme }) => ({
  width: "80%",
  textDecoration: "none",
}));

export const IconAndMessageContainer = styled(CardActions)(({ theme }) => ({
  height: "2.5vh",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "2.5%",
}));

export const IconsContainer = styled("div")(({ theme }) => ({
  ".MuiSvgIcon-root": {
    marginLeft: "auto",
    color: "#fff",
  },
}));
