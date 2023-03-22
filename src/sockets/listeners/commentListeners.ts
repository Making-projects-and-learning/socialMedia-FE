/** Libraries */
import { useEffect } from "react";

import { useSelector, TypedUseSelectorHook } from "react-redux";

/** Store */
import { RootState } from "../../store";

/** Custom hooks */
import { usePostStore } from "../../hooks";

/** Utils */
import { socketEvents } from "../../sockets";

/** Interfaces */
import { Post } from "../../interfaces/post.interface";

const { POST } = socketEvents;

/** useEffects used as a listeners of events since this point */
export const commentListeners = () => {
  const { UpdatePost } = usePostStore();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { socket } = useAppSelector((state) => state.socket);
  const { _id, username } = useAppSelector((state) => state.auth);

  /** Make a comment */
  useEffect(() => {
    if (socket) {
      socket.on(POST.createComment, ({ postDB }) => {
        console.log("COMMENT CREATED");
        UpdatePost(postDB);
      });
    }
    return () => {
      if (socket) {
        socket.off(POST.createComment);
      }
    };
  }, [socket, _id, username]);

  /** Delete a comment */
  useEffect(() => {
    if (socket) {
      socket.on(POST.deleteComment, (postDB: Post) => {
        console.log("COMMENT DELETED");
        UpdatePost(postDB);
      });
    }
    return () => {
      if (socket) {
        socket.off(POST.deleteComment);
      }
    };
  }, [socket]);

  /** Likes to comments */
  /** Like a comment listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.likeComment, (data: any) => {
        console.log("COMMENT LIKED");
        UpdatePost(data.postDB);
        // if (_id && username) {
        //   if (postDB.owner._id === _id && user_name !== username) {
        //     startUiOpenLikeNotification(user_name);
        //   }
        // }
      });
    }
    return () => {
      if (socket) {
        socket.off(POST.likeComment);
      }
    };
  }, [socket, _id, username]);

  /** UnLike a comment listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.unLikeComment, (data: any) => {
        console.log("COMMENT UNLIKED");
        UpdatePost(data.postDB);
      });
    }
    return () => {
      if (socket) {
        socket.off(POST.unLikeComment);
      }
    };
  }, [socket]);
};
