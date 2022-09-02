import classNames from 'classnames';
import { Message } from '../../types/Message';
import { User } from '../../types/User';
import './Messages.scss';

type Props = {
  message: Message;
  user: User;
  fieldRef: React.RefObject<HTMLDivElement>;
};

export const Messages: React.FC<Props> = ({ message, user, fieldRef }) => {
  return (
    <>
      <div className="Messages">    
        <div className={classNames("Messages__container", {
            "Messages__container--author" : message.isAuthor
          })}>
        
          {!message.isAuthor && (
            <div className="photo">
              <img
                className='photo__img'
                alt={user.userName}
                src={user.photo}
              />
            </div>
          )}
         
          <div className={classNames("Messages__text", {
            "Messages__text--author" : message.isAuthor
          })}>
            {message.text}

            <div className={classNames("Messages__date", {
            "Messages__date--author" : message.isAuthor
          })}>
              {message.date}
            </div>
          </div>
        </div> 
   
        <div ref={fieldRef}></div>  
      </div>
    </>
  );
}