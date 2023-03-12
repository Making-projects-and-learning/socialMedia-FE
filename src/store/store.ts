/** Libraries */
import { configureStore } from "@reduxjs/toolkit";

/** Redux toolkit - Slices */
import { authSlice } from "./slices/auth.slice";
import { postSlice } from "./slices/post.slice";
import { uiSlice } from "./slices/ui.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
