/** Libraries */
import { Button } from "@mui/material";

import { styled } from "@mui/material/styles";

/** Custom hooks */
import { usePostStore, useUiStore } from "../../hooks";

/** Material UI - Custom components */
const ButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "7.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
}));

const PostsButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "100%",
  fontSize: "14px",
  borderRadius: "none",
}));

export const NewPostsButton = (): JSX.Element => {
  const {
    newPostsAlert: { status, quantity },
  } = useUiStore();

  const { SocketLoadPosts } = usePostStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    SocketLoadPosts();
  };

  return (
    <>
      {status && (
        <ButtonContainer>
          <PostsButton onClick={handleClick}>
            Show {quantity} new {quantity > 1 ? "posts" : "post"}
          </PostsButton>
        </ButtonContainer>
      )}
    </>
  );
};
