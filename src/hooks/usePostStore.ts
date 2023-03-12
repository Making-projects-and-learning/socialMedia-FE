/** Libraries */
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Api - Axios instance */
import socialMediaApi from "../api/socialMediaApi";

/** Store */
import type { RootState, AppDispatch } from "../store";

/** Redux toolkit - Slices */
import {
  closeSocketLikeRequest,
  closeSocketUnLikeRequest,
  deletePost,
  loadAllNewPosts,
  loadNewPost,
  loadNewRecivedPost,
  loadPosts,
  openSocketLikeRequest,
  openSocketUnLikeRequest,
  updatePost,
} from "../store/slices/post.slice";
import {
  uiRemoveNewPostsAlert,
  uiSetNewPostsAlert,
} from "../store/slices/ui.slice";

/** Utils */
import { socketEvents } from "../utils";

/** Interfaces */
import { Post } from "../interfaces/post.interface";
import { AuthState } from "../interfaces/slices/authSlice.interface";
import { PostState } from "../interfaces/slices/postSlice.interface";

/** Socket Instance */
import { getSocketInstance } from "../utils/socketInstance";
const socket = getSocketInstance();

/** Socket Events */
const { POST } = socketEvents;

export const usePostStore = () => {
  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const {
    posts,
    counter: { skip, limit },
    socketRequests,
  } = useAppSelector((state: { post: PostState }) => state.post);
  const { _id } = useAppSelector((state: { auth: AuthState }) => state.auth);

  /** Socket requests handler */
  /** Like */
  const setCloseSocketLikeRequest = () => {
    dispatch(closeSocketLikeRequest());
  };

  /** UnLike */
  const setCloseSocketUnLikeRequest = () => {
    dispatch(closeSocketUnLikeRequest());
  };

  /** Normal Posts */
  const startLoadPosts = async () => {
    try {
      const {
        data: { posts },
        status,
      } = await socialMediaApi.get(`post?skip=${skip}&limit=${limit}`);

      if (status === 200) {
        console.log(skip, limit);
        console.log(posts);
        dispatch(uiRemoveNewPostsAlert());
        dispatch(loadPosts(posts));
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const LoadNewPost = (post: Post) => {
    dispatch(loadNewPost(post));
  };

  const UpdatePost = (post: Post) => {
    dispatch(updatePost(post));
  };

  const DeletePost = (post: Post) => {
    dispatch(deletePost(post));
  };

  const SocketNewPost = (description: string, image?: string | "") => {
    if (socket) {
      const post = {
        description: description,
        imageUrl: image,
        createdAt: new Date(),
      };

      socket.emit(POST.create, post);
    }
  };

  const SocketDeletePost = (post_id: string) => {
    if (socket) {
      socket.emit(POST.delete, post_id);
    }
  };

  /** New Posts Recived */
  const LoadNewRecivedPost = (post: Post) => {
    dispatch(loadNewRecivedPost(post));
  };

  const LoadAllNewPosts = () => {
    dispatch(loadAllNewPosts());
    dispatch(uiRemoveNewPostsAlert());
  };

  /** Likes */
  const SocketLikeAPost = (post: Post) => {
    if (socket) {
      dispatch(
        updatePost({
          ...post,
          likedBy: [...post.likedBy, _id.toString()],
        })
      );
      dispatch(openSocketLikeRequest(post));
      socket.emit(POST.like, post._id);
    }
  };

  const SocketUnLikeAPost = (post: Post) => {
    if (socket) {
      dispatch(
        updatePost({
          ...post,
          likedBy: post.likedBy.filter((e) => e.toString() !== _id.toString()),
        })
      );
      dispatch(openSocketUnLikeRequest(post));
      socket.emit(POST.unLike, post._id);
    }
  };

  return {
    /** Properties */
    posts,
    socket,
    socketRequests,

    /** Methods */
    /** Socket requests handler */
    setCloseSocketLikeRequest,
    setCloseSocketUnLikeRequest,
    /** Normal posts */
    startLoadPosts,
    SocketNewPost,
    LoadNewPost,
    UpdatePost,
    SocketDeletePost,
    DeletePost,
    /** New posts recived */
    LoadNewRecivedPost,
    LoadAllNewPosts,
    /** Likes */
    SocketLikeAPost,
    SocketUnLikeAPost,
  };
};
