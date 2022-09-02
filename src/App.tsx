import { Navigate, Route, Routes } from 'react-router-dom';
import { AppPage } from './components/AppPage';
import { Chat } from './components/Chat';
import { NotFoundPage } from './components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppPage />}>
        <Route path=":chatId" element={<Chat />} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
