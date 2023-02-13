/** Libraries */
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/** Middlewares */
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

/** Components */
import { HomePage, LoginPage } from "../pages";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = (): JSX.Element => {

  const {
    _id,
    checking,
    startChecking,
  } = useAuthStore();

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
            <PublicRoute isAutenticated={!!_id}>
              <LoginPage />
            </PublicRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};
