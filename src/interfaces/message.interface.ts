/** Interfaces */
import { User } from "./user.interface";

/** Types */
import { MongoId } from "../vite-env";

export interface Message {
  _id: MongoId;
  from: User;
  to: User[];
  body: string;
  createdAt: Date;
}
