import './CurrentChat.scss';
import '../../styles/user_photo.scss';
import classNames from 'classnames';
import { Chat } from '../../types/Chat';
import { Link, useParams } from 'react-router-dom';
import { Message } from '../../types/Message';
import dayjs from 'dayjs';

type Props = {
  chat: Chat;
  queryToLowerCase: string;
};

export const CurrentChat: React.FC<Props> = ({ chat, queryToLowerCase }) => {
  const { userName, photo } = chat.user;
  const { chatId } = useParams();

  let displayedMessage: Message;

  const lastMessage = chat.messages[chat.messages.length - 1]
  let displayedMessageText;

  if (queryToLowerCase.length) {
    displayedMessage = chat.messages.reverse().find(message => message.text.toLowerCase().includes(queryToLowerCase)) || lastMessage;
  } else {
    displayedMessage = lastMessage;
  }

  if (displayedMessage.text.length > 50) {
    displayedMessageText = displayedMessage.text.slice(0, 50) + '...'
  } else {
    displayedMessageText = displayedMessage.text;
  }

  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const displayedDate = dayjs(displayedMessage.date, 'D/M/YY h:mm A').format('MMM D, YYYY');

  return (
    <Link 
      to={`/${chat.id}`}
      className={classNames("CurrentChat", {
        "CurrentChat--selected" : chat.id === chatId,
      })}
    >
      <div className="photo photo--ticked">
        <img
          className='photo__img'
          alt={userName}
          src={photo}
        />
      </div>

      <div className="CurrentChat__container">
        <div className="CurrentChat__sub-container">
          <div className="CurrentChat__name">{userName}</div>
          <div className="CurrentChat__date">{displayedDate}</div>
        </div>

        <div className="CurrentChat__message">{displayedMessageText}</div>
      </div>
    </Link>
  );
}