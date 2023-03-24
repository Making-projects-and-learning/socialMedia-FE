/** Libraries */
import { forwardRef, useCallback } from "react";
import { useSnackbar, CustomContentProps } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@mui/material/Tooltip";

/** Material UI - Custom components */
import {
  StyledSnackbarContent,
  StyledCard,
  StyledTypography,
  StyledCardActions,
  IconAndMessageContainer,
  IconsContainer,
  A,
} from "./styled";

interface ReportCompleteProps extends CustomContentProps {
  postId: string;
}

const CommentPost = forwardRef<HTMLDivElement, ReportCompleteProps>(
  ({ id, postId, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleClick = useCallback(() => {}, []);

    const handleDismiss = useCallback(
      (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        closeSnackbar(id);
      },
      [id, closeSnackbar]
    );

    return (
      <StyledSnackbarContent onClick={handleClick} ref={ref}>
        <StyledCard>
          <StyledCardActions>
            <Tooltip title="Go to the comment!" arrow>
              <A href={`/post/${postId}`}>
                <IconAndMessageContainer>
                  <IconsContainer>
                    <CommentIcon />
                  </IconsContainer>
                  <StyledTypography variant="body2">
                    {props.message}
                  </StyledTypography>
                </IconAndMessageContainer>
              </A>
            </Tooltip>
            <IconsContainer>
              <Tooltip title="Close" placement="right" arrow>
                <IconButton size="small" onClick={handleDismiss}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </IconsContainer>
          </StyledCardActions>
        </StyledCard>
      </StyledSnackbarContent>
    );
  }
);

CommentPost.displayName = "CommentPost";

export default CommentPost;
