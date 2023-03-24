/** Libraries */
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/** Middlewares */
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

/** Pages */
import { Home, Login, Post } from "../pages";
import Register from "../pages/Register";

/** Components */
import { LikeNotification } from "../components/ui/LikeNotification/LikeNotification";

/** Custom hooks */
import useSocket from "../hooks/useSocket";
import { useAuthStore } from "../hooks";

/** Sockets */
import { socketListeners } from "../sockets";

export const AppRouter = (): JSX.Element => {
  /** Socket initialization */
  useSocket();
  /** Socket listeners */
  socketListeners();

  const { _id, checking, startChecking } = useAuthStore();

  useEffect(() => {
    startChecking();
  }, []);

  if (checking) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress
          color="primary"
          size="80px"
          sx={{ display: "block" }}
        />
      </Backdrop>
    );
  }

  return (
    <BrowserRouter>
      <LikeNotification />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAutenticated={!!_id}>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <PrivateRoute isAutenticated={!!_id}>
              <Post />
            </PrivateRoute>
          }
        />

        <Route
          path="login"
          element={
            <PublicRoute isAuthenticated={!!_id}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="register"
          element={
            <PublicRoute isAuthenticated={!!_id}>
              <Register />
            </PublicRoute>
          }
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
