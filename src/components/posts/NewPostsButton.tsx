/** Libraries */
import { useEffect } from "react";

import { Button } from "@mui/material";

import { styled } from "@mui/material/styles";

/** Custom hooks */
import { useAuthStore, usePostStore, useUiStore } from "../../hooks";

/** Utils */
import { socketEvents } from "../../utils";

/** Interfaces */
import { Post } from "../../interfaces/post.interface";

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

/** Socket Events */
const { NOTIFICATION, CONNECT } = socketEvents;

export const NewPostsButton = (): JSX.Element => {
  const { _id } = useAuthStore();

  const {
    newPostsAlert: { status, quantity },
    startUiSetNewPostsAlert,
  } = useUiStore();

  const { LoadNewRecivedPost, LoadAllNewPosts, socket } = usePostStore();

  /** New posts listener */
  useEffect(() => {
    if (socket) {
      socket.on(NOTIFICATION.newPostsAvailable, (postDB: Post) => {
        if (_id !== postDB.owner._id) {
          startUiSetNewPostsAlert();
          LoadNewRecivedPost(postDB);
        }
      });
    }
    return () => {
      socket.off(NOTIFICATION.newPostsAvailable);
      socket.off(CONNECT);
    };
  }, [socket]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    LoadAllNewPosts();
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
