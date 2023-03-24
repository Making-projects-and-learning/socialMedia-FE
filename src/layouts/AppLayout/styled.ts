/** Libraries */
import { styled } from "@mui/system";

/** Material UI - Custom components */
export const AppWrapperContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
}));

export const ContentContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "6%",
  width: "61.5%",
  height: "auto",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    left: "7.5%",
    width: "92.5%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    top: "12vh",
    left: 0,
  },
}));

export const NavbarSectionContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "6%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "7.5%",
  },
  [theme.breakpoints.down("sm")]: {
    zIndex: 1000,
  },
}));

export const ChatsSectionContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  width: "32.5%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #E9E9E9",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
