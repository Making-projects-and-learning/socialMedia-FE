/** Interfaces */
import { User } from "./user.interface";

/** Types */
import { MongoId } from "../vite-env";

export interface Post {
  _id: MongoId;
  description: string;
  imageUrl: string;
  owner: User;
  likedBy?: MongoId[];
  comments?: Comment[];
  createdAt: Date;
}

export interface Comment {
  _id: MongoId;
  content: string;
  imageUrl: string;
  owner: User;
  likedBy?: MongoId[];
  createdAt: Date;
}
