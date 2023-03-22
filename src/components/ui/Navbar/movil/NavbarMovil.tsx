/** Libraries */
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

/** Components */
import { MenuNavbar } from "./components/MenuNavbar";

/** Custom hooks */
import { useAuthStore } from "../../../../hooks";

/** Material UI - Custom components */
import { NavbarContainer, AvatarContainer, FontName } from "./styled";

export const NavbarMovil = (): JSX.Element => {
  const { username, picture } = useAuthStore();

  /** Render function components */
  const renderAvatar = () => (
    <AvatarContainer>
      <Stack>
        <Avatar alt="Avatar" src={picture} />
      </Stack>
      <FontName>{username}</FontName>
    </AvatarContainer>
  );

  return (
    <NavbarContainer>
      {renderAvatar()}
      <MenuNavbar />
    </NavbarContainer>
  );
};
