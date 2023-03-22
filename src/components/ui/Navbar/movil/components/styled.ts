/** Libraries */
import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const MainContainer = styled("div")(({ theme }) => ({
  width: "10%",
  height: "50%",
  color: "#fff",
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

export const MenuContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "10vh",
  left: 0,
  width: "100%",
  height: "40vh",
  backgroundColor: "#fff",
  boxShadow: "0 5px 5px 0 rgb(0 0 0 / 10%)",
  transition: "all .3s",
  zIndex: 2000,
}));

export const List = styled("ul")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const Item = styled("li")(({ theme }) => ({
  listStyle: "none",
}));

export const A = styled("a")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: "5%",
  width: "100%",
  height: "10vh",
  textDecoration: "none",
  fontSize: "13.5px",
  color: "#333",
  borderTop: "1px solid #eee",
  fontFamily: "Source Sans Pro, sans-serif",
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontWeight: 700,
  transition: "color .3s",
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

export const Backdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "10vh",
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  transition: "all .3s",
  zIndex: 1000,
}));
