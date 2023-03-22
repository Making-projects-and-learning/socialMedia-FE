import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

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
      state.socket =
        (state.socket === null || state.socket === false) && action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
