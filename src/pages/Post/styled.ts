/** Libraries */
import { styled } from "@mui/system";

import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

/** Material UI - Custom components */
export const PostContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "25vh",
  height: "auto",
  paddingTop: "1.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const AvatarContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "5vh",
  height: "max-content",
  marginTop: "1.5vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiAvatar-root": {
    height: "45px",
    width: "45px",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiAvatar-root": {
      height: "45px",
      width: "45px",
    },
  },
}));

export const AvatarAndNameContainer = styled("div")(({ theme }) => ({
  width: "40%",
  height: "100%",
  paddingLeft: "2vw",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

export const SecondContainer = styled("form")(({ theme }) => ({
  width: "97.5%",
  minHeight: "20vh",
  height: "100%",
  margin: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
    paddingRight: "5vw",
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
  minHeight: "10vh",
  width: "100%",
  overflowY: "visible",
  padding: "10px",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "start",
  [theme.breakpoints.down("sm")]: {
    minHeight: "5vh",
    justifyContent: "flex-end",
  },
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
  color: "gray",
  fontSize: "18px",

  strong: {
    color: "#000",
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "2.5vw",
  },
}));

export const LikeIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
}));

export const CustomFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
  color: "rgb(249, 24, 128)",
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
  width: "100%",
  height: "7.5vh",
  color: "gray",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "start",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "1.5vw",
  },
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
