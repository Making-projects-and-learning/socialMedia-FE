/** Libraries */
import { Button } from "@mui/material";

import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const ModalContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "3500",
}));

export const Modal = styled("div")(({ theme }) => ({
  width: "60vw",
  height: "30vh",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "#fff",
  zIndex: "3500",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    width: "95%",
    height: "20%",
    gap: "10%",
  },
}));

export const ButtonsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "30%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

export const ConfirmButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  borderRadius: "none",
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  borderRadius: "none",
}));
