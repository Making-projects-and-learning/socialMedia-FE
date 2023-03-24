/** Libraries */
import { useEffect } from "react";

import { useSelector, TypedUseSelectorHook } from "react-redux";

import Swal from "sweetalert2";

import { closeSnackbar, useSnackbar } from "notistack";

/** Store */
import { RootState } from "../../store";

/** Custom hooks */
import { usePostStore } from "../../hooks";

/** Utils */
import { socketEvents } from "../../sockets";

/** Interfaces */
import { Comment, Post } from "../../interfaces/post.interface";

const { POST } = socketEvents;

/** useEffects used as a listeners of events since this point */
export const commentListeners = () => {
  const { UpdatePost } = usePostStore();

  const { enqueueSnackbar } = useSnackbar();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { socket } = useAppSelector((state) => state.socket);
  const { _id, username } = useAppSelector((state) => state.auth);

  /** Make a comment */
  useEffect(() => {
    if (socket) {
      socket.on(
        POST.createComment,
        ({ postDB, user_name }: { postDB: Post; user_name: string }) => {
          console.log("COMMENT CREATED");
          UpdatePost(postDB);
          if (_id && username) {
            if (postDB.owner._id === _id && user_name !== username) {
              // startUiOpenLikeNotification(user_name);
              enqueueSnackbar(`${user_name} commented your post!`, {
                variant: "commentPost",
                autoHideDuration: 6000,
                // @ts-ignore
                postId: postDB._id.toString(),
              });
            }
          }
        }
      );
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
      socket.on(
        POST.deleteComment,
        ({
          postDB,
          commentDB,
          user_name,
        }: {
          postDB: Post;
          commentDB: Comment;
          user_name: string;
        }) => {
          console.log("COMMENT DELETED");
          UpdatePost(postDB);
          if (commentDB.owner._id === _id) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: `Comment deleted!`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      );
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
      socket.on(
        POST.likeComment,
        ({
          postDB,
          commentDB,
          user_name,
        }: {
          postDB: Post;
          commentDB: Comment;
          user_name: string;
        }) => {
          console.log("COMMENT LIKED");
          UpdatePost(postDB);
          if (_id && username) {
            if (commentDB.owner._id === _id && user_name !== username) {
              // startUiOpenLikeNotification(user_name);
              enqueueSnackbar(`${user_name} likes your comment!`, {
                variant: "likesComment",
                autoHideDuration: 6000,
                // @ts-ignore
                postId: postDB._id.toString(),
              });
            }
          }
        }
      );
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
