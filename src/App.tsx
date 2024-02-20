import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import NavBar from './components/NavBar';
import SellPage from './pages/SellPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/sell" element={<SellPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
