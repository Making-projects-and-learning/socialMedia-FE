/** Libraries */
import { useEffect } from "react";

import { useSelector, TypedUseSelectorHook } from "react-redux";

/** Store */
import { RootState } from "../../store";

/** Custom hooks */
import { useUiStore, usePostStore } from "../../hooks";

/** Utils */
import { socketEvents } from "../../sockets";

/** Interfaces */
import { Post } from "../../interfaces/post.interface";

const { POST } = socketEvents;

/** useEffects used as a listeners of events since this point */
export const postListeners = () => {
  const { LoadNewPost, UpdatePost, DeletePost } = usePostStore();

  const { startUiOpenLikeNotification } = useUiStore();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { socket } = useAppSelector((state) => state.socket);
  const { _id, username } = useAppSelector((state) => state.auth);

  /** Create post listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.create, (data: Post) => {
        LoadNewPost(data);
        console.log("New post loaded!");
      });
    }

    return () => {
      if (socket) {
        socket.off(POST.create);
      }
    };
  }, [socket]);

  /** Delete post listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.delete, (data: Post) => {
        console.log("POST DELETED");
        DeletePost(data);
      });
    }

    return () => {
      if (socket) {
        socket.off(POST.delete);
      }
    };
  }, [socket]);

  /** Likes to posts */
  /** Like a posts listener */
  useEffect(() => {
    if (socket) {
      socket.on(
        POST.like,
        ({ postDB, user_name }: { postDB: Post; user_name: string }) => {
          console.log("POST LIKED");
          UpdatePost(postDB);
          if (_id && username) {
            if (postDB.owner._id === _id && user_name !== username) {
              startUiOpenLikeNotification(user_name);
            }
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket.off(POST.like);
      }
    };
  }, [socket, _id, username]);

  /** UnLike a posts listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.unLike, (postDB: Post) => {
        console.log("POST UNLIKED");
        UpdatePost(postDB);
      });
    }
    return () => {
      if (socket) {
        socket.off(POST.unLike);
      }
    };
  }, [socket]);
};
