/** Libraries */
import { io, type Socket } from "socket.io-client";

/** Utils */
import { socketEvents } from "./socketEvents";

/** Utils */
import { getEnvironmets } from "../utils";

const { VITE_API_URL } = getEnvironmets();

/** Socket Events */
const { CONNECT } = socketEvents;

export const getSocketInstance = () => {
  /** Socket client initialized */
  const socket: Socket = io(`${VITE_API_URL}`, {
    auth: {
      token: localStorage.getItem("token"),
    },
  });

  /** Connected listener */
  socket.on(CONNECT, () => {
    console.log("Connected to the server!");
  });

  return socket;
};
