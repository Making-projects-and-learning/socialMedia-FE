/** Libraries */
import { useLocation, useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import IconButton from "@mui/material/IconButton";

/** Custom hooks */
import { useAuthStore } from "../../../../hooks";

/** Material UI - Custom components */
import {
  NavbarContainer,
  ItemsContainer,
  CustomAvatar,
  IconsContainer,
} from "./styled";

export const NavbarComputer = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { startLogout, picture } = useAuthStore();

  const handleHome = () => {
    if (pathname !== "/") {
      navigate("/");
    }
  };

  const handleLogout = () => {
    startLogout();
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
          <IconButton>
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
