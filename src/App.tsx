import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import NavBar from './components/NavBar';
import SellPage from './pages/SellPage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import useCheckLoginStatus from './services/authService';

function App() {
  const checkLoginStatus = useCheckLoginStatus();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
