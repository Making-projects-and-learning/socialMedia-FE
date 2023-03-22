/** Interfaces */
import { Post } from "../post.interface";

interface CounterPosts {
  skip: number;
  limit: number;
}

export interface PostState {
  posts: Post[];
  recivedPosts: Post[];
  counter: CounterPosts;
}
