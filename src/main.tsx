/** Libraries */
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

/** Router */
import { AppRouter } from "./routers/AppRouter";

/** Store */
import { store } from "./store";

/** Utils */
import { getEnvironmets } from "./utils";

/** Styles */
import "./index.css";

const { VITE_REACT_APP_GOOGLE_CLIENT_ID } = getEnvironmets();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={VITE_REACT_APP_GOOGLE_CLIENT_ID!}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </GoogleOAuthProvider>
);
