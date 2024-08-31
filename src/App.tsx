import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import NavBar from './components/NavBar';
import SellPage from './pages/SellPage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ChatPage from './pages/ChatPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:buyerId/:sellerId/:bookId/room/:chatRoomId" element={<ChatRoomPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/password/reset" element={<PasswordResetPage />} />
      </Routes>
    </>
  );
}

export default App;
