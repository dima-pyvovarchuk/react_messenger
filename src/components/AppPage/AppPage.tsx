import './AppPage.scss';
import { Sidebar } from '../Sidebar';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import chatsFromServer from '../../api/chats.json'
import { Outlet, useParams } from 'react-router-dom';
import { useWidthOfWindow } from '../../hooks/useWidthOfWindow';

export const AppPage: React.FC = () => {
  const [chats, onSave] = useLocalStorage('chats', chatsFromServer)
  const [widthOfWindow] = useWidthOfWindow();
  const { chatId } = useParams();

  return (
    <div className="AppPage">
      {widthOfWindow < 1024 && !chatId && (
        <Sidebar 
          chats={chats}
        />
      )}

      {widthOfWindow < 1024 && chatId && (
        <Outlet context={{ chats, onSave }} />
      )}

      {widthOfWindow > 1024 && chatId && (
          <>
            <Sidebar 
              chats={chats}
            />

            <Outlet context={{ chats, onSave }} />
          </>
      )}

      {widthOfWindow > 1024 && !chatId && (
          <>
            <Sidebar 
              chats={chats}
            />

            <div className='Warning-container'>
              <p className='Warning'>Select a chat</p>
            </div>
          </>
      )}  
    </div>
  );
}