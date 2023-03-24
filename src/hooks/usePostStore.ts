/** Libraries */
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Api - Axios instance */
import socialMediaApi from "../api/socialMediaApi";

/** Store */
import type { RootState, AppDispatch } from "../store";

/** Redux toolkit - Slices */
import {
  deletePost,
  loadAllNewPosts,
  loadNewPost,
  loadNewRecivedPost,
  loadPosts,
  setCounterLimitStore,
  setCounterSkipStore,
  updatePost,
} from "../store/slices/post.slice";
import {
  uiRemoveNewPostsAlert,
  uiSetNewPostsAlert,
} from "../store/slices/ui.slice";

/** Utils */
import { socketEvents } from "../sockets";

/** Interfaces */
import { Comment, NonPopulatedPost, Post } from "../interfaces/post.interface";
import { AuthState } from "../interfaces/slices/authSlice.interface";
import { PostState } from "../interfaces/slices/postSlice.interface";

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
  } = useAppSelector((state: { post: PostState }) => state.post);
  const { _id } = useAppSelector((state: { auth: AuthState }) => state.auth);
  const { socket } = useAppSelector((state) => state.socket);

  /** Counter */
  const startSetCounterSkipStore = (newSkip: number) => {
    dispatch(setCounterSkipStore(newSkip));
  };
  const startSetCounterLimitStore = (newLimit: number) => {
    dispatch(setCounterLimitStore(newLimit));
  };

  /** Only storage managment */
  const LoadNewPost = (post: Post) => {
    dispatch(loadNewPost(post));
  };

  const UpdatePost = (post: Post) => {
    dispatch(updatePost(post));
  };
  const DeletePost = (post: NonPopulatedPost) => {
    dispatch(deletePost(post));
  };

  // New Posts Recived
  const LoadNewRecivedPost = (post: Post) => {
    dispatch(loadNewRecivedPost(post));
  };

  const LoadAllNewPosts = () => {
    dispatch(loadAllNewPosts());
    dispatch(uiRemoveNewPostsAlert());
  };

  /** Normal Posts - Api call */
  const startLoadPosts = async (customSkip?: number) => {
    let skipToSend: number;
    if (customSkip && customSkip > skip) {
      skipToSend = customSkip;
      dispatch(setCounterSkipStore(customSkip));
    } else {
      skipToSend = skip;
    }
    try {
      const {
        data: { posts },
        status,
      }: { data: { posts: Post[] }; status: number } = await socialMediaApi.get(
        `post?skip=${skipToSend}&limit=${limit}`
      );

      if (status === 200 && posts) {
        dispatch(uiRemoveNewPostsAlert());
        dispatch(loadPosts(posts));
      }
    } catch (error) {
      return console.log(error);
    }
  };

  /** Since this point all sockets emit */
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

  /** Likes */
  const SocketLikeAPost = (post: Partial<Post>) => {
    if (socket) {
      socket.emit(POST.like, post._id);
    }
  };

  const SocketUnLikeAPost = (post: Partial<Post>) => {
    if (socket) {
      socket.emit(POST.unLike, post._id);
    }
  };

  /** Comments */
  const SocketCreateComment = (
    comment_id: string,
    comment: Partial<Comment>
  ) => {
    if (socket) {
      const commentData = {
        ...comment,
        createdAt: new Date(),
      };

      socket.emit(POST.createComment, comment_id, commentData);
    }
  };

  const SocketDeleteComment = (comment_id: string) => {
    if (socket) {
      socket.emit(POST.deleteComment, comment_id);
    }
  };

  /** Likes */
  const SocketLikeAComment = (comment: Comment) => {
    if (socket) {
      socket.emit(POST.likeComment, comment._id);
    }
  };

  const SocketUnLikeAComment = (comment: Comment) => {
    if (socket) {
      socket.emit(POST.unLikeComment, comment._id);
    }
  };

  return {
    /** Properties */
    posts,
    // socket,
    skip,
    limit,

    /** Methods */
    /** Counter */
    startSetCounterSkipStore,
    startSetCounterLimitStore,
    /** Only storage managment */
    LoadNewPost,
    UpdatePost,
    DeletePost,
    // New Posts Recived
    LoadNewRecivedPost,
    LoadAllNewPosts,
    /** Normal Posts - Api call */
    startLoadPosts,
    /** Since this point all sockets emit */
    SocketNewPost,
    SocketDeletePost,
    /** Likes */
    SocketLikeAPost,
    SocketUnLikeAPost,
    /** Comments */
    SocketCreateComment,
    SocketDeleteComment,
    /** Likes */
    SocketLikeAComment,
    SocketUnLikeAComment,
  };
};
