import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import logo from '../../../assets/logo.png'; 

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="rePort Logo" className="logo-image" />
      </Link>
      <button className="hamburger" onClick={toggleNav}>
        <span className={`line line1 ${isNavOpen ? 'active' : ''}`}></span>
        <span className={`line line2 ${isNavOpen ? 'active' : ''}`}></span>
        <span className={`line line3 ${isNavOpen ? 'active' : ''}`}></span>
      </button>
      <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li>
            <Link to="/" onClick={toggleNav}>Главная</Link>
          </li>
          <li>
            <Link to="/constructor" onClick={toggleNav}>Конструктор</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNav}>О нас</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
