/** Interfaces */
import { Post } from "./post.interface";
import { Room } from "./room.interface";

/** Types */
import { MongoId } from "../vite-env";

export interface User {
  _id: MongoId;
  name: string;
  username: string;
  email: string;
  picture: string;
  password: string;
  description: string;
  posts: Post[];
  friends: User[];
  groups: Room[];
  individualRooms: Room[];
  likedPosts: Post[];
  commentedPosts?: Comment[];
  online: boolean;
}
