/** Libraries */
import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";

/** Utils */
import { socketEvents } from "../utils";

export const useSocket = () => {
  /** Socket client initialized */
  const socket: Socket = io("http://localhost:8080", {
    auth: {
      token: localStorage.getItem("token"),
    },
  });

  const SocketConnect = () => {
    socket.connect();
  };

  const SocketDisconnect = () => {
    socket.disconnect();
  };

  return {
    /** Properties */
    socket,
    socketEvents,

    /** Methods */
    SocketConnect,
    SocketDisconnect,
  };
};
