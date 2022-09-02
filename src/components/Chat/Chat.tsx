import './Chat.scss';
import '../../styles/user_photo.scss';
import { Messages } from '../Messages';
import { SendMessage } from '../SendMessage/SendMessage';
import { useChats } from '../../hooks/useChats';
import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';

export const Chat: React.FC = () => {
  const { chats, onSave } = useChats();
  const { chatId } = useParams();
  const fieldRef = useRef<HTMLDivElement>(null);
  const selectedChat = chats.find(chat => chat.id === chatId) || null;

  return (
    <div className="Chat">
      {selectedChat !== null && (
        <>
          <div className="Chat__header">
            <Link
              to="/"
              className='Chat__header-icon-back' 
            />

            <div className="photo Chat__header-photo photo--ticked">
              <img
                className='photo__img'
                alt={selectedChat.user.userName}
                src={selectedChat.user.photo}
              />
            </div>

            <div className="Chat__header-name">{selectedChat.user.userName} </div>
          </div>

          <div className="ChatContainer"> 
            {selectedChat.messages.map(message => (
              <Messages
                key={message.id}
                message={message} 
                user={selectedChat.user}
                fieldRef={fieldRef} 
              />
            ))}
          </div>

          <SendMessage
            onSave={onSave} 
            chats={chats} 
            selectedChatId={selectedChat.id} 
            fieldRef={fieldRef}
          />
        </>
      )}  
    </div>
  )
}