/** Libraries */
import { Navigate } from "react-router-dom";

/** Types */
type AppProps = {
    children: JSX.Element;
    isAutenticated: boolean;
};

export const PrivateRoute = ({ children, isAutenticated }: AppProps) => {

    return isAutenticated ? children : <Navigate to="/login" />
};