/** Interfaces */
import { User } from "./user.interface";
import { Message } from "./message.interface";

/** Types */
import { MongoId } from "../vite-env";

export interface Room {
  _id: MongoId;
  users: User[];
  messages: Message[];
}
