import { Chats } from '../Chats';
import './Sidebar.scss';
import photo from '../../images/photo1.jpg'
import '../../styles/user_photo.scss';
import { Chat } from '../../types/Chat';
import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

type Props = {
  chats: Chat[];
}

export const Sidebar: React.FC<Props> = ({ chats }) => {
  const [query, setQuery] = useState('');
  const queryToLowerCase = query.toLowerCase();
  let displayedChats: Chat[];
  
  dayjs.extend(customParseFormat)

  const chatsSortedByDate = chats.sort((chat1, chat2) => +dayjs(chat2.messages[chat2.messages.length - 1].date, 'D/M/YY h:mm A')
   - +dayjs(chat1.messages[chat1.messages.length - 1].date, 'D/M/YY h:mm A'));
   
  const chatsFilteredByName = chats.filter(chat => chat.user.userName.toLowerCase().includes(queryToLowerCase));
  const chatsFilteredByText = chats.filter(chat => chat.messages.some(message => message.text.toLowerCase().includes(queryToLowerCase)));

  if (chatsFilteredByName.length) {
    displayedChats = chatsFilteredByName;
  } else if (chatsFilteredByText.length) {
    displayedChats = chatsFilteredByText
  } else if (queryToLowerCase) {
    displayedChats = [];
  } else {
    displayedChats = chatsSortedByDate;
  }
  
  return (
    <div className="Sidebar">
      <div className="Search">
        <div className="photo Search__photo photo--ticked">
          <img
            className='photo__img'
            alt='User'
            src={photo}
          />
        </div>

        <form 
          className="Search__form"
        >
          <div className="Search__button" />
      
          <input 
            type="search" 
            placeholder="Search chat" 
            className="Search__input" 
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </div>

      <Chats 
        chats={displayedChats}
        queryToLowerCase={queryToLowerCase}
      />
    </div>
  );
}