/** Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Interface */
import { Post } from "../../interfaces/post.interface";
import { PostState } from "../../interfaces/slices/postSlice.interface";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  } as PostState,
  reducers: {
    loadPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...action.payload];
    },
    loadNewPost: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
    postsLogout: (state) => {
      state.posts = [];
    },
  },
});

export const { loadPosts, loadNewPost, postsLogout } = postSlice.actions;
export const postState = postSlice.getInitialState();
