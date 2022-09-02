import { Chat } from '../../types/Chat';
import { CurrentChat } from '../CurrentChat';
import './Chats.scss';

type Props = {
  chats: Chat[];
  queryToLowerCase: string;
}

export const Chats: React.FC<Props> = ({ chats, queryToLowerCase }) => {
  return (
    <div className="Chats">
      <div className="Chats__title">Chats</div>

      {chats.map(chat => (
        <CurrentChat 
          key={chat.id}
          chat={chat}
          queryToLowerCase={queryToLowerCase}
        />
      ))}
    </div>
  );
}