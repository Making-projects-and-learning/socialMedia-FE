/** Interfaces */
import { Post } from "../post.interface";

interface CounterPosts {
  skip: number;
  limit: number;
}

type Like = {
  status: boolean;
  post: Post | null;
};

interface SocketRequests {
  like: Like;
  unLike: Like;
}

export interface PostState {
  posts: Post[];
  recivedPosts: Post[];
  counter: CounterPosts;
  socketRequests: SocketRequests;
}
