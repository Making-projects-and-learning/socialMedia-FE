/** Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Interface */
import { Post } from "../../interfaces/post.interface";
import { PostState } from "../../interfaces/slices/postSlice.interface";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    counter: {
      skip: 0,
      limit: 10,
    },
    socketRequests: {
      like: {
        status: false,
        post: null,
      },
      unLike: {
        status: false,
        post: null,
      },
    },
    posts: [],
    recivedPosts: [],
  } as PostState,
  reducers: {
    /** Counter */
    setCounterSkipStore: (state, action: PayloadAction<number>) => {
      state.counter = {
        ...state.counter,
        skip: action.payload,
      };
    },
    setCounterLimitStore: (state, action: PayloadAction<number>) => {
      state.counter = {
        ...state.counter,
        limit: action.payload,
      };
    },

    /** Socket requests handler */
    /** Like */
    openSocketLikeRequest: (state, action: PayloadAction<Post>) => {
      state.socketRequests = {
        ...state.socketRequests,
        like: {
          status: true,
          post: action.payload,
        },
      };
    },
    closeSocketLikeRequest: (state) => {
      state.socketRequests = {
        ...state.socketRequests,
        like: {
          status: false,
          post: null,
        },
      };
    },

    /** unLike */
    openSocketUnLikeRequest: (state, action: PayloadAction<Post>) => {
      state.socketRequests = {
        ...state.socketRequests,
        unLike: {
          status: true,
          post: action.payload,
        },
      };
    },
    closeSocketUnLikeRequest: (state) => {
      state.socketRequests = {
        ...state.socketRequests,
        unLike: {
          status: false,
          post: null,
        },
      };
    },

    /** Normal posts */
    loadPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...action.payload];
    },
    loadNewPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const indice = state.posts.findIndex((e) => e._id === action.payload._id);
      if (indice !== -1) {
        state.posts[indice] = { ...state.posts[indice], ...action.payload };
      }
    },
    deletePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter((e) => e._id !== action.payload._id);
    },

    /** New posts */
    loadNewRecivedPost: (state, action: PayloadAction<Post>) => {
      state.recivedPosts = [action.payload, ...state.recivedPosts];
    },
    loadAllNewPosts: (state) => {
      state.posts = [...state.recivedPosts, ...state.posts];
      state.recivedPosts = [];
    },

    /** Both */
    postsLogout: (state) => {
      state.posts = [];
      state.recivedPosts = [];
    },
  },
});

export const {
  /** Counter */
  setCounterSkipStore,
  setCounterLimitStore,
  /** Socket requests handler */
  openSocketLikeRequest,
  closeSocketLikeRequest,
  openSocketUnLikeRequest,
  closeSocketUnLikeRequest,
  /** Normal posts */
  loadPosts,
  loadNewPost,
  updatePost,
  deletePost,
  /** New posts */
  loadNewRecivedPost,
  /** Both */
  postsLogout,
  loadAllNewPosts,
} = postSlice.actions;
export const postState = postSlice.getInitialState();
