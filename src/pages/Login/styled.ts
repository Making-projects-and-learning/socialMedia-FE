/** Libraries */
import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const LoginCard = styled("div")(({ theme }) => ({
  width: "80%",
  height: "95%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

export const FieldsContainer = styled("form")(({ theme }) => ({
  width: "70%",
  height: "100%",
  marginTop: "7.5vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5vh",
}));

export const TitleContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const LoginButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const LoginButton = styled("button")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  color: "#fff",
  fontSize: "14px",
  backgroundColor: "#000",
  borderRadius: "20px",
  cursor: "pointer",
  ":hover": {
    boxShadow: "5px 5px 5px 1px rgba(0, 0, 0, 0.2)",
    border: "none",
    transition: "all 0.5s ease",
  },
}));
