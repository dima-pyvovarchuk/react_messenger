import { Message } from "./Message";
import { User } from "./User";

export interface Chat {
  id: string;
  user: User;
  messages: Message[];
};