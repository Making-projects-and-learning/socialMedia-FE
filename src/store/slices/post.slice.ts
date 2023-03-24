/** Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Interface */
import { NonPopulatedPost, Post } from "../../interfaces/post.interface";
import { PostState } from "../../interfaces/slices/postSlice.interface";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    counter: {
      skip: 0,
      limit: 10,
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

    /** Normal posts */
    loadPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
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
    deletePost: (state, action: PayloadAction<NonPopulatedPost>) => {
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
      state.counter = {
        skip: 0,
        limit: 10,
      };
      state.posts = [];
      state.recivedPosts = [];
    },
  },
});

export const {
  /** Counter */
  setCounterSkipStore,
  setCounterLimitStore,
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
