/** Libraries */
import { useEffect } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Store Type */
import type { RootState, AppDispatch } from "../store";

/** Utils */
import { useSocket } from "./useSocket";
import { useUiStore } from "./useUiStore";

export const usePostStore = () => {
  const {
    socket,
    socketEvents: { POST, NOTIFICATION },
  } = useSocket();

  const { startUiSetNewPostsAlert } = useUiStore();

  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const { progressBackdrop } = useAppSelector((state) => state.ui);

  useEffect(() => {
    /** New posts listener */
    socket.on(NOTIFICATION.newPostsAvailable, () => {
      startUiSetNewPostsAlert();
      console.log("POST ALERT RECIVED");
    });

    return () => {
      socket.off(NOTIFICATION.newPostsAvailable);
    };
  }, [socket]);

  const SocketNewPost = () => {
    const post = {
      title: "This is a publication",
      description: "This is a description",
      imageUrl:
        "https://elcomercio.pe/resizer/t1bWYdftm9VT4LR_dhHYf1BALgg=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/Q2YSNNEAY5EVHPLCFI4NU4FQQA.jpg",
    };

    socket.emit(POST.create, post);
  };

  return {
    /** Properties */
    // progressBackdrop,

    /** Methods */
    SocketNewPost,
  };
};
