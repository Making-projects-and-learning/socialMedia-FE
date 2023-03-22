/** Libraries */
import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";

/** Material UI - Custom components */
export const NavbarContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "1px solid #E9E9E9",
  paddingBottom: "5vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
}));

export const ItemsContainer = styled("div")(({ theme }) => ({
  minWidth: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  "&.MuiAvatar-root": {
    height: "35px",
    width: "35px",
  },
  [theme.breakpoints.down(705)]: {
    "&.MuiAvatar-root": {
      height: "30px",
      width: "30px",
    },
  },
  [theme.breakpoints.down(651)]: {
    "&.MuiAvatar-root": {
      height: "25px",
      width: "25px",
    },
  },
}));

export const IconsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "10%",
  border: "none",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
}));
