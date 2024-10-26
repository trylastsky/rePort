import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/modules/Header/Header'; 
import MainPage from './components/OtherPages/MainPage/MainPage'; 
import PrivacyPolicyPage from './components/OtherPages/PrivacyPolicyPage/PrivacyPolicyPage';
import AboutPage from './components/OtherPages/AboutPage/AboutPage';
import Footer from './components/modules/Footer/Footer';
import ReportConstructor from './components/MainLogic/ReportConstructor/ReportConstructor';
import FileList from './components/MainLogic/FileList/FileList';
import Navbar from './components/modules/NavBar/NavBar';
import TrashPage from './components/MainLogic/TrashPage/TrashPage';

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
          <Route path="/constructor" element={<ReportConstructor />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-terms" element={<PrivacyPolicyPage />} />
          <Route path="/constructor-file_list" element={<FileList/>} />
          <Route path="/constructor-trash" element={<TrashPage/>} />
          <Route path="/constructor-projects" element={<></>} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </main>
    <Footer/>
    </div>
  );
};

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
