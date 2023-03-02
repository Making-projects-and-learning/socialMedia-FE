/** Libraries */
import { styled } from "@mui/material/styles";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

/** Material UI - Custom components */
const NavbarContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  gap: "10px",
}));

const IconsContainer = styled("div")(({ theme }) => ({
  width: "5vw",
  height: "10%",
  border: "none",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
}));

export const Navbar = (): JSX.Element => {
  return (
    <NavbarContainer>
      <IconsContainer>
        <PhotoCameraIcon />
      </IconsContainer>
      <IconsContainer>
        <PhotoCameraIcon />
      </IconsContainer>
      <IconsContainer>
        <PhotoCameraIcon />
      </IconsContainer>
      <IconsContainer>
        <PhotoCameraIcon />
      </IconsContainer>
      <IconsContainer>
        <PhotoCameraIcon />
      </IconsContainer>
    </NavbarContainer>
  );
};
