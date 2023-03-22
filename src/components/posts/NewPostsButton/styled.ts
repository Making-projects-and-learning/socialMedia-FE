/** Libraries */
import { Button } from "@mui/material";

import { styled } from "@mui/material/styles";

/** Material UI - Custom components */
export const ButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "7.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
}));

export const PostsButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "100%",
  fontSize: "14px",
  borderRadius: "none",
}));
