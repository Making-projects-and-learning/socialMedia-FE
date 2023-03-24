/** Libraries */
// import { Socket } from "socket.io-client";

/** Interfaces */
import { PostState } from "../slices/postSlice.interface";

export interface UsePostStore extends PostState {
  SocketNewPost: Function;
  SocketLoadPosts: Function;
}
