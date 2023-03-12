/** Libraries */
import axios, { type AxiosHeaders, type AxiosInstance } from "axios";

/** Utils */
import { getEnvironmets } from "../utils";

const { VITE_API_URL } = getEnvironmets();

const socialMediaApi: AxiosInstance = axios.create({
  baseURL: `${VITE_API_URL}/api`,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": `${VITE_API_URL}`,
    "Access-Control-Allow-Credentials": true,
  },
});

// Todo: configurar interceptores
socialMediaApi.interceptors.request.use((config) => {
  (config.headers as AxiosHeaders).set(
    "x-token",
    localStorage.getItem("token")
  );

  return config;
});

export default socialMediaApi;
