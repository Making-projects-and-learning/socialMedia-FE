/** Interfaces */
import { User } from "./user.interface";

/** Types */
import { MongoId } from "../vite-env";

export interface Post {
  _id: MongoId;
  description: string;
  imageUrl: string;
  owner: User;
  likedBy: User[];
  createdAt: Date;
}
