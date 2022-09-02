import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import { getAnswer } from '../../api/api';
import { Chat } from '../../types/Chat';
import { Message } from '../../types/Message';
import './SendMessage.scss';

type Props = {
  onSave: (value: Chat[]) => void;
  chats: Chat[];
  selectedChatId: string;
  fieldRef: React.RefObject<HTMLDivElement>;
};

export const SendMessage: React.FC<Props> = ({ onSave, chats, selectedChatId, fieldRef }) => {
  const [textOfMessage, setTextOfMessage] = useState('');
  const formRef = useRef<HTMLButtonElement>(null);

  const scroll = () => {
    if(fieldRef.current) {
      fieldRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  let firstChatsToSave: Chat[];
  let secondChatsToSave: Chat[];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!textOfMessage.length) {
      return;
    }

    const newMessage: Message = {
      id: uuidv4(),
      isAuthor: true,
      text: textOfMessage.trim(),
      date: dayjs().format('D/M/YY h:mm A'),
    } 

    firstChatsToSave = [...chats]
    firstChatsToSave.find(chat => chat.id === selectedChatId)?.messages.push(newMessage);

    onSave(firstChatsToSave);
    setTimeout(scroll, 1);
    setTextOfMessage('');

    const newResponseText = (await getAnswer()).value;

    const newResponse: Message = {
      id: uuidv4(),
      isAuthor: false,
      text: newResponseText,
      date: dayjs().format('D/M/YY h:mm A'),
    } 
    
    setTimeout(() => {
      secondChatsToSave = [...firstChatsToSave]
      secondChatsToSave.find(chat => chat.id === selectedChatId)?.messages.push(newResponse);
      onSave(secondChatsToSave);
      setTimeout(scroll, 1);
    }, 1000)
  }

  const handleKeyPressed = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmit(event);
    }
  }

  return (
    <div className="SendMessage">
      <form 
        className="SendMessage__form"
        onSubmit={handleSubmit}
      >
        <input 
          name="text"
          autoFocus={true}
          className="SendMessage__input"
          placeholder='Message'
          value={textOfMessage}
          onChange={(event) => {
            setTextOfMessage(event.target.value)
          }}
          onKeyPress={handleKeyPressed}
        />

        {textOfMessage && (
          <button type="submit" className="SendMessage__button" ref={formRef}/>
        )}
      </form>
    </div>
  );
}