/** Libraries */
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

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
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress
          color="primary"
          size="80px"
          sx={{ display: "block" }}
        />
        <Stack sx={{ width: "300px", marginTop: "5vh" }} spacing={2}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <strong>The server is for free</strong> so this can take a bit of
            time the first time you start it. Thanks for your time!
          </Alert>
        </Stack>
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
