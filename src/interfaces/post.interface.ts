/** Interfaces */
import { User } from "./user.interface";

/** Types */
import { MongoId } from "../vite-env";

export interface Comment {
  _id: MongoId;
  content: string;
  imageUrl: string;
  owner: User;
  post: Post;
  likedBy?: User[];
  createdAt: Date;
}

export interface NonPopulatedComment
  extends Omit<Comment, "owner" | "post" | "likedBy"> {
  owner: string;
  post: string;
  likedBy?: string[];
}

export interface Post {
  _id: MongoId;
  description: string;
  imageUrl: string;
  owner: User;
  likedBy?: User[];
  comments?: Comment[];
  createdAt: Date;
}

export interface NonPopulatedPost
  extends Omit<Post, "owner" | "likedBy" | "comments"> {
  owner: string;
  likedBy?: string[];
  comments: string[];
}
