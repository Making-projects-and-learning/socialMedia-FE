/** Libraries */
import { useEffect, useState } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import { closeSnackbar, useSnackbar } from "notistack";

import useIntersectionObserver from "@react-hook/intersection-observer";

/** Store */
import { RootState } from "../../../store";

/** Custom hooks */
import { useAuthStore, usePostStore, useUiStore } from "../../../hooks";

/** Utils */
import { socketEvents } from "../../../sockets";

/** Interfaces */
import { Post } from "../../../interfaces/post.interface";

/** Material UI - Custom components */
import { ButtonContainer, PostsButton } from "./styled";

/** Socket Events */
const { NOTIFICATION, CONNECT } = socketEvents;

export const NewPostsButton = (): JSX.Element => {
  /** Notifications */
  const { enqueueSnackbar } = useSnackbar();

  /** Store */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { socket } = useAppSelector((state) => state.socket);

  const [snackbarId, setSnackbarId] = useState<any>();

  const { _id } = useAuthStore();

  const {
    newPostsAlert: { status, quantity },
    startUiSetNewPostsAlert,
  } = useUiStore();

  const { LoadNewRecivedPost, LoadAllNewPosts } = usePostStore();

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { isIntersecting } = useIntersectionObserver(ref);

  /** Alert up load new posts */
  useEffect(() => {
    console.log(isIntersecting);
    if (status && !isIntersecting) {
      setSnackbarId(
        enqueueSnackbar("Load new posts", {
          variant: "newPostsAvailable",
          // autoHideDuration: 6000,
          persist: true,
          preventDuplicate: true,
          anchorOrigin: { horizontal: "center", vertical: "top" },
        })
      );
    } else {
      closeSnackbar(snackbarId);
    }
  }, [status, isIntersecting]);

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
      if (socket) {
        socket.off(NOTIFICATION.newPostsAvailable);
        socket.off(CONNECT);
      }
    };
  }, [socket]);

  const handleLoadNewPosts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    LoadAllNewPosts();
  };

  const renderNewPostButton = () => (
    <ButtonContainer ref={setRef}>
      <PostsButton onClick={handleLoadNewPosts}>
        Show {quantity} new {quantity > 1 ? "posts" : "post"}
      </PostsButton>
    </ButtonContainer>
  );

  return <>{status && renderNewPostButton()}</>;
};
