/** Libraries */
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const PostContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "25vh",
  height: "auto",
  paddingTop: "1.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    transition: "0.3s ease-out all",
  },
}));

export const AvatarContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "5vh",
  height: "max-content",
  paddingRight: "1vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiAvatar-root": {
    height: "35px",
    width: "35px",
  },
}));

export const AvatarAndNameContainer = styled("div")(({ theme }) => ({
  width: "80%",
  height: "100%",
  paddingLeft: "0.5vw",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    paddingLeft: "2.5vw",
  },
}));

export const SecondContainer = styled("form")(({ theme }) => ({
  width: "90%",
  minHeight: "10vh",
  height: "100%",
  margin: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const OptionsButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

export const DeleteIconbutton = styled(IconButton)(({ theme }) => ({
  position: "relative",
  right: "0",
  top: "0",
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
  [theme.breakpoints.down("sm")]: {
    visibility: "visible",
  },
}));

export const ItemsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  marginTop: "5px",
  paddingTop: "20px",
  marginBottom: "10px",
  borderTop: "1px solid #E9E9E9",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const DescriptionContainer = styled("div")(({ theme }) => ({
  // height: "auto",
  minHeight: "5vh",
  width: "100%",
  overflowY: "visible",
  padding: "10px",
  marginLeft: "-2.5vw",
  marginBottom: "10px",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "start",
}));

export const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "95%",
  minHeight: "25ch",
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
  border: "1px solid #E9E9E9",
}));

export const CommentIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
}));

export const CommentFont = styled(Typography)(({ theme }) => ({
  color: "rgb(83, 100, 113)",
  fontWeight: 700,
  fontSize: "18px",
}));

export const LikeIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
}));

export const CustomFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
  color: "rgb(249, 24, 128)",
}));

export const UsernameContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1%",
}));

export const UsernameFont = styled(Typography)(({ theme }) => ({
  color: "rgb(15, 20, 25)",
  fontWeight: 700,
  fontSize: "20px",
  marginLeft: "1vw",
}));

export const Dot = styled(Typography)(({ theme }) => ({
  color: "gray",
  textAlign: "center",
  fontSize: "20px",
}));

export const DateFont = styled(Typography)(({ theme }) => ({
  color: "gray",
  textAlign: "center",
  fontSize: "14px",
}));

export const DescriptionFont = styled(Typography)(({ theme }) => ({
  // color: "rgb(249, 24, 128)",
}));

export const FavoriteIconQuantityFont = styled(Typography)(({ theme }) => ({
  color: "rgb(249, 24, 128)",
  fontWeight: 700,
  fontSize: "18px",
}));

export const BorderIconQuantityFont = styled(Typography)(({ theme }) => ({
  color: "rgb(83, 100, 113)",
  fontWeight: 700,
  fontSize: "18px",
}));
