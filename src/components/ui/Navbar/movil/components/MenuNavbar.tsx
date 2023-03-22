/** Libraries */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    console.log("Go to account");
    handleMenu();
  };

  const handleMessages = () => {
    console.log("Go to messages");
    handleMenu();
  };

  const handleLogout = () => {
    startLogout();
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
