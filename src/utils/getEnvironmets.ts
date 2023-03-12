/** Types */
import { EnvironmentVariables } from "../vite-env";

export const getEnvironmets = (): EnvironmentVariables => {
  // import.meta.env;

  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_REACT_APP_GOOGLE_CLIENT_ID: import.meta.env
      .VITE_REACT_APP_GOOGLE_CLIENT_ID,
  };
};
