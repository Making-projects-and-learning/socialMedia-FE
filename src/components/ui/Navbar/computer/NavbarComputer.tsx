/** Libraries */
import { useLocation, useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Swal from "sweetalert2";

import Tooltip from "@mui/material/Tooltip";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import { closeSnackbar, useSnackbar } from "notistack";

import IconButton from "@mui/material/IconButton";

/** Custom hooks */
import { useAuthStore, useUiStore } from "../../../../hooks";

/** Material UI - Custom components */
import {
  NavbarContainer,
  ItemsContainer,
  CustomAvatar,
  IconsContainer,
} from "./styled";

export const NavbarComputer = (): JSX.Element => {
  /** Notifications */
  const { enqueueSnackbar } = useSnackbar();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { startLogout, picture } = useAuthStore();

  const handleHome = () => {
    if (pathname !== "/") {
      navigate("/");
      window.scroll(0, 0);
    }
  };

  const handleAccount = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `This page is in process!`,
      showConfirmButton: true,
      timer: 6000,
    });
  };

  const handleLogout = () => {
    Swal.fire({
      position: "center",
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) startLogout();
    });
  };

  /** Render function components */
  const renderHomeButton = () => (
    <IconsContainer>
      <Tooltip title="Home" placement="right" arrow>
        <IconButton onClick={handleHome}>
          <HomeIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Tooltip>
    </IconsContainer>
  );

  const renderItems = () => (
    <ItemsContainer>
      <IconsContainer sx={{ visibility: "hidden" }}>
        <IconButton>
          <Brightness1Icon />
        </IconButton>
      </IconsContainer>
      <IconsContainer sx={{ visibility: "hidden" }}>
        <IconButton>
          <Brightness1Icon />
        </IconButton>
      </IconsContainer>
      <IconsContainer>
        <IconButton sx={{ visibility: "hidden" }}>
          <Brightness1Icon />
        </IconButton>
      </IconsContainer>
      <IconsContainer>
        <Tooltip title="Account" placement="right" arrow>
          <IconButton onClick={handleAccount}>
            <CustomAvatar alt="Avatar" src={picture} />
          </IconButton>
        </Tooltip>
      </IconsContainer>
    </ItemsContainer>
  );

  const renderLogoutButton = () => (
    <IconsContainer>
      <Tooltip title="Logout" placement="right" arrow>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </IconsContainer>
  );

  return (
    <NavbarContainer>
      {renderHomeButton()}
      {renderItems()}
      {renderLogoutButton()}
    </NavbarContainer>
  );
};
