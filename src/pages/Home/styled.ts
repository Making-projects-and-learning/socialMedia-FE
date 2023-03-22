/** Libraries */
import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const HomeContainer = styled("div")(({ theme }) => ({
  marginTop: "17.5vh",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    marginTop: 0,
  },
}));

export const TitleContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: "6%",
  width: "61.5%",
  height: "17.5vh",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  paddingTop: "1vw",
  paddingLeft: "1.5vw",
  borderBottom: "1px solid #E9E9E9",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  zIndex: "1000",
  [theme.breakpoints.down("md")]: {
    left: "7.5%",
    width: "92.5%",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const ObserverContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "10vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

export const LoaderContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "2.5%",
}));
