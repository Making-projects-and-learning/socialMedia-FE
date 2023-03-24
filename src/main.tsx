/** Libraries */
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

/** Router */
import { AppRouter } from "./routers/AppRouter";

/** Store */
import { store } from "./store";

/** Utils */
import { getEnvironmets } from "./utils";

/** Styles */
import "./index.css";
import LikedPost from "./components/ui/Notifications/LikesPost/LikesPost";
import LikesComment from "./components/ui/Notifications/LikesComment/LikesComment";
import CommentPost from "./components/ui/Notifications/CommentPost/commentPost";
import NewPostsAvailable from "./components/ui/Notifications/NewPostsAvailable/NewPostsAvailable";

const { VITE_REACT_APP_GOOGLE_CLIENT_ID } = getEnvironmets();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={VITE_REACT_APP_GOOGLE_CLIENT_ID!}>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={6}
        Components={{
          likedPost: LikedPost,
          likesComment: LikesComment,
          commentPost: CommentPost,
          newPostsAvailable: NewPostsAvailable,
        }}
      >
        <AppRouter />
      </SnackbarProvider>
    </Provider>
  </GoogleOAuthProvider>
);
