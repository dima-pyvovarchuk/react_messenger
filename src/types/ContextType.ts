import { Chat } from './Chat';

export type ContextType = {
  chats: Chat[],
  onSave: (value: Chat[]) => void,
};