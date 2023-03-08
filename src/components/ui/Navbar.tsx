/** Libraries */
import { Link, useNavigate } from "react-router-dom";

import { Grid, TextField, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Material UI - Custom components */
const NavbarContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  //   margin: "5px",
  //   borderRadius: "15px",
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
  //   margin: "5px",
  //   borderRadius: "15px",
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
