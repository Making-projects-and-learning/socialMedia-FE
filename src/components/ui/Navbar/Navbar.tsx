/** Libraries */
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/** Components */
import { NavbarComputer } from "./computer/NavbarComputer";
import { NavbarMovil } from "./movil/NavbarMovil";

export const Navbar = (): JSX.Element => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return <>{sm ? <NavbarMovil /> : <NavbarComputer />}</>;
};
