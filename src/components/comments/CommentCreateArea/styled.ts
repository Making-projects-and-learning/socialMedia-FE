/** Libraries */
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const CommentAreaContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "25vh",
  height: "auto",
  paddingTop: "1.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#fff",
}));

export const AvatarContainer = styled("div")(({ theme }) => ({
  width: "10%",
  minHeight: "25vh",
  height: "max-content",
  paddingLeft: "1.5vw",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  "& .MuiAvatar-root": {
    height: "45px",
    width: "45px",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const FormContainer = styled("form")(({ theme }) => ({
  width: "90%",
  minHeight: "20vh",
  height: "100%",
  margin: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const ItemsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  marginTop: "5px",
  paddingTop: "20px",
  marginBottom: "10px",
  borderTop: "1px solid #E9E9E9",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  height: "auto",
  width: "100%",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  resize: "none",

  "& .MuiOutlinedInput-notchedOutline": {
    display: "none",
  },
  ":focus-visible": {
    outline: "none",
  },
}));

export const ButtonAndCounterContainer = styled("div")(({ theme }) => ({
  width: "35%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "50%",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  borderRadius: "20px",
}));

export const ImageIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    ".MuiSvgIcon-root": {
      fontSize: "30px",
    },
  },
}));

export const InputFile = styled("input")(({ theme }) => ({
  position: "absolute",
  visibility: "hidden",
}));

export const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  minWidth: "25ch",
  display: "flex",
  alignItems: "start",
  justifyContent: "flex-start",
  mb: 1,
  overflow: "hidden",
  border: "none",
}));

export const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "20% 10%",
  borderRadius: "15px",
}));

export const CloseIconContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  marginTop: "1.5%",
  marginLeft: "1.5%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "6px",
  ".MuiSvgIcon-root": {
    color: "#fff",
    fontSize: "20px",
  },
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.40)",
  },
}));
