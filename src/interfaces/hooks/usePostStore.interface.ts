/** Libraries */
import { Socket } from "socket.io-client";

/** Interfaces */
import { PostState } from "../slices/postSlice.interface";
import { SocketEvents } from "../../utils/socketEvents";

export interface UsePostStore extends PostState {
  socket: Socket;
  socketEvents: SocketEvents;
  SocketNewPost: Function;
  SocketLoadPosts: Function;
}
