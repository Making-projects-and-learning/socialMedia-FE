/** Libraries */
import { Navigate } from "react-router-dom";

/** Types */
type AppProps = {
  children: JSX.Element;
  isAuthenticated: boolean;
};

export const PublicRoute = ({ children, isAuthenticated }: AppProps) => {
  return !isAuthenticated ? children : <Navigate to="/" />;
};
