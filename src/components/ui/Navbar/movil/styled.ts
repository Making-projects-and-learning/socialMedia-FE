/** Libraries */
import { styled } from "@mui/material/styles";

import { Typography } from "@mui/material";

/** Material UI - Custom components */
export const NavbarContainer = styled("div")(({ theme }) => ({
  left: 0,
  top: 0,
  position: "fixed",
  width: "100%",
  height: "12vh",
  background: "#fff",
  zIndex: "1000",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    height: "10vh",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
}));

export const AvatarContainer = styled("div")(({ theme }) => ({
  width: "40%",
  height: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
  "& .MuiAvatar-root": {
    height: "47.5px",
    width: "47.5px",
    cursor: "pointer",
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

export const FontName = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  textDecoration: "none",
  fontSize: "16px",
  color: "#333",
  fontFamily: "Source Sans Pro, sans-serif",
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontWeight: 700,
  transition: "color .3s",
  cursor: "pointer",
  ":hover": {
    color: theme.palette.primary.main,
  },
}));
