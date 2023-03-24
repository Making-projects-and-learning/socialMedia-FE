/** Libraries */
import { styled } from "@mui/material/styles";

import { SnackbarContent } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

/** Material UI - Custom components */
export const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  marginTop: "17.5vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    marginTop: "10vh",
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "25vw",
  height: "6vh",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "#2196f3",
  borderRadius: "25px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "45vw",
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  width: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

export const IconsContainer = styled("div")(({ theme }) => ({
  ".MuiSvgIcon-root": {
    // marginLeft: "auto",
    fontSize: "18px",
    color: "#fff",
  },
  [theme.breakpoints.down("sm")]: {
    ".MuiSvgIcon-root": {
      fontSize: "24px",
    },
  },
}));
