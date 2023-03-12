import { Box, Grid, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const RegisterCard = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10px",
});

export const Form = styled("form")({
  width: "50%",
  display: "flex",
  margin: "0 auto",
  marginTop: "30px",
});

export const GridContainer = styled(Grid)({
  gap: "20px",
});

export const AuthTextField = styled(TextField)({
  width: "100%",
});

export const AuthButton = styled(Button)({
  backgroundColor: "#121212",
  borderRadius: "18px",
  fontWeight: "500",
  color: "#fff",
  width: "100%",
  ":hover": {
    color: "#000",
    backgroundColor: "#A4CDDA",
    fontWeight: "500",
  },
});

export const AuthLink = styled(Link)({
  cursor: "pointer",
  color: "#000",
});
