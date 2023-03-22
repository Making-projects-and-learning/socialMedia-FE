/** Libraries */
import { useEffect } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";

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
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { socket } = useAppSelector((state) => state.socket);

  const { _id } = useAuthStore();

  const {
    newPostsAlert: { status, quantity },
    startUiSetNewPostsAlert,
  } = useUiStore();

  const { LoadNewRecivedPost, LoadAllNewPosts } = usePostStore();

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
    <ButtonContainer>
      <PostsButton onClick={handleLoadNewPosts}>
        Show {quantity} new {quantity > 1 ? "posts" : "post"}
      </PostsButton>
    </ButtonContainer>
  );

  return <>{status && renderNewPostButton()}</>;
};
