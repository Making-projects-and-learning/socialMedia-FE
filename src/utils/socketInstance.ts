/** Libraries */
import { io, type Socket } from "socket.io-client";
import { socketEvents } from "./socketEvents";

/** Socket Events */
const { CONNECT } = socketEvents;

export const getSocketInstance = () => {
  /** Socket client initialized */
  const socket: Socket = io("http://localhost:8080", {
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
