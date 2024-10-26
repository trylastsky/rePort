import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/modules/Header/Header'; 
import MainPage from './components/OtherPages/MainPage/MainPage'; 
import PrivacyPolicyPage from './components/OtherPages/PrivacyPolicyPage/PrivacyPolicyPage';
import AboutPage from './components/AboutPage/AboutPage';
import Footer from './components/modules/Footer/Footer';
import Constructor from './components/MainLogic/Constructor/Constructor';
import FileList from './components/MainLogic/FileList/FileList';
import Navbar from './components/modules/NavBar/NavBar';

const App: React.FC = () => {
  const location = useLocation();

  // Определяем условия для отображения Navbar
  const showNavbar = 
    location.pathname === '/constructor' || 
    location.pathname === '/constructor-file_list' || 
    location.pathname === '/constructor-trash' ||
    location.pathname === '/constructor-projects';

  return (
    <div className="App">
      <Header />
      {/* Условный рендеринг для Navbar */}
      {showNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/constructor" element={<Constructor />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-terms" element={<PrivacyPolicyPage />} />
          <Route path="/constructor-file_list" element={<FileList/>} />
          {/* <Route path="/constructor-trash" element={<FileList/>} /> */}
          <Route path="/constructor-projects" element={<></>} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </main>

    </div>
  );
};

// Обернем App в Router для получения location
const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
