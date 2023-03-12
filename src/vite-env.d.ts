/** This is the return of getEnvironments function */
export type EnvironmentVariables = {
    [key: string]: string | undefined;
};

/** MongoId type */
export type MongoId = string;

/** This solved a problem with env variables types */
interface ImportMeta {
    env: {
        // NODE_ENV: 'development' | 'production';
        VITE_REACT_APP_API_URL: string;
        VITE_REACT_APP_GOOGLE_CLIENT_ID: string;
    };
}