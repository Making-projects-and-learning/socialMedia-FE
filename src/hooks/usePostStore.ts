/** Libraries */
import { useEffect } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Api - Axios instance */
import socialMediaApi from "../api/socialMediaApi";

/** Store Type */
import type { RootState, AppDispatch } from "../store";
import { loadNewPost, loadPosts } from "../store/slices/post.slice";

/** Utils */
import { useSocket } from "./useSocket";
import { useUiStore } from "./useUiStore";

export const usePostStore = () => {
  const {
    socket,
    socketEvents: { POST, NOTIFICATION },
  } = useSocket();

  const { startUiSetNewPostsAlert, startUiRemoveNewPostsAlert } = useUiStore();

  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { posts } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (socket) {
      /** Create post listener */
      socket.on(POST.create, (data) => {
        dispatch(loadNewPost(data));
        console.log("NEW POST LOADED");
      });

      /** New posts listener */
      socket.on(NOTIFICATION.newPostsAvailable, () => {
        startUiSetNewPostsAlert();
        console.log("NEW POSTS ALERT RECIVED");
      });

      return () => {
        socket.off(POST.getAll);
        socket.off(POST.create);
        socket.off(NOTIFICATION.newPostsAvailable);
        // socket.close();
      };
    }
  }, [socket]);

  const SocketNewPost = (description: string, image?: string | "") => {
    const post = {
      description: description,
      imageUrl: image,
    };

    socket.emit(POST.create, post);
  };

  const SocketLoadPosts = async () => {
    try {
      const {
        data: { posts },
        status,
      } = await socialMediaApi.get("post");

      if (status === 200) {
        startUiRemoveNewPostsAlert();
        dispatch(loadPosts(posts));
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return {
    /** Properties */
    posts,

    /** Methods */
    SocketNewPost,
    SocketLoadPosts,
  };
};
