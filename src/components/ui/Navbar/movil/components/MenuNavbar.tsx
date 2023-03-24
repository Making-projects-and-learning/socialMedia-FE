/** Libraries */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

/** Custom hooks */
import { useAuthStore } from "../../../../../hooks";

/** Material UI - Custom components */
import {
  MainContainer,
  MenuContainer,
  List,
  Item,
  A,
  Backdrop,
} from "./styled";

export const MenuNavbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { startLogout } = useAuthStore();

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenu = (): void => {
    return openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  const handleHome = () => {
    if (pathname !== "/") {
      navigate("/");
    }
    handleMenu();
  };

  const handleAccount = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `This page is in process!`,
      showConfirmButton: true,
      timer: 6000,
    });
    handleMenu();
  };

  const handleMessages = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `This page is in process!`,
      showConfirmButton: true,
      timer: 6000,
    });
    handleMenu();
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
    handleMenu();
  };

  /** Render function components */
  const renderCloseAndMenuButton = () => (
    <IconButton onClick={handleMenu}>
      {openMenu ? (
        <CloseIcon sx={{ transition: "color .3s" }} />
      ) : (
        <MenuIcon sx={{ transition: "color .3s" }} />
      )}
    </IconButton>
  );

  const renderListItems = () => (
    <List>
      <Item>
        <A onClick={handleHome}>HOME</A>
      </Item>
      <Item>
        <A onClick={handleAccount}>ACCOUNT</A>
      </Item>
      <Item>
        <A onClick={handleMessages}>MESSAGES</A>
      </Item>
      <Item>
        <A onClick={handleLogout}>LOGOUT</A>
      </Item>
    </List>
  );

  return (
    <MainContainer>
      {renderCloseAndMenuButton()}
      <MenuContainer
        sx={{
          visibility: openMenu ? "visible" : "hidden",
          opacity: openMenu ? 1 : 0,
        }}
      >
        {renderListItems()}
      </MenuContainer>
      {openMenu && <Backdrop onClick={handleMenu} />}
    </MainContainer>
  );
};
