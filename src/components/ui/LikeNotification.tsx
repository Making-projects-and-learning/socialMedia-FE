/** Libraries */
import React, { forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/** Custom hooks */
import { useUiStore } from "../../hooks";

export const LikeNotification: React.FC = () => {
  const { likeNotification, startUiCloseLikeNotification } = useUiStore();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClose = () => {
    startUiCloseLikeNotification();
  };

  return (
    <Snackbar
      open={likeNotification.status}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity="success">
        {likeNotification.user} likes your post!
      </MuiAlert>
    </Snackbar>
  );
};
