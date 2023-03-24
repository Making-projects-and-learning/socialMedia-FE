import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  } as SocketState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket | null>) {
      // @ts-ignore
      state.socket = state.socket === null && action.payload;
    },
    socketLogout(state) {
      state.socket = null;
    },
  },
});

export const { setSocket, socketLogout } = socketSlice.actions;
