/** Libraries */
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/** Middlewares */
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

/** Pages */
import { HomePage, LoginPage } from "../pages";
import Register from "../pages/Register";

/** Components */
import { LikeNotification } from "../components/ui/LikeNotification";

/** Custom hooks */
import { useAuthStore } from "../hooks";

export const AppRouter = (): JSX.Element => {
  const { _id, checking, startChecking } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** This is to implement the functionality of
   * load products when the user cames until the
   * bottom of the page.
   */
  window.addEventListener("scroll", function () {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      miFuncion();
    }
  });

  function miFuncion() {
    if (isLoading) {
      console.log("We are at the bottom");
      setIsLoading(false);
    }
  }
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
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="login"
          element={
            <PublicRoute isAuthenticated={!!_id}>
              <LoginPage />
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
      </Routes>
    </BrowserRouter>
  );
};
