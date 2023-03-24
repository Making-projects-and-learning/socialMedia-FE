/** Interfaces */
import { User } from "../user.interface";

export interface AuthState extends Omit<User, "password"> {
  checking: boolean;
}
