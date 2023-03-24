/** Libraries */
import { forwardRef, useCallback } from "react";
import { useSnackbar, CustomContentProps } from "notistack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

/** Material UI - Custom components */
import {
  StyledSnackbarContent,
  StyledCard,
  StyledTypography,
  StyledCardActions,
  IconsContainer,
} from "./styled";
import { usePostStore } from "../../../../hooks";

const NewPostsAvailable = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { LoadAllNewPosts } = usePostStore();

    const handleClick = useCallback(() => {
      LoadAllNewPosts();
      window.scroll(0, 0);
    }, []);

    return (
      <StyledSnackbarContent onClick={handleClick} ref={ref}>
        <StyledCard>
          <StyledCardActions>
            <IconsContainer>
              <ArrowUpwardIcon />
            </IconsContainer>
            <StyledTypography variant="body2">{props.message}</StyledTypography>
          </StyledCardActions>
        </StyledCard>
      </StyledSnackbarContent>
    );
  }
);

NewPostsAvailable.displayName = "NewPostsAvailable";

export default NewPostsAvailable;
